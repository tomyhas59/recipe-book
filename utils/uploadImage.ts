import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { supabase } from "../supabaseClient";
import { base64ToUint8Array } from "./base64ToUint8Array";

export const uploadImage = async (
  uri: string,
  bucket: string = "recipe-images"
): Promise<string | null> => {
  try {
    let fileBytes: Uint8Array;

    // 플랫폼별 파일 변환
    if (Platform.OS === "web") {
      const response = await fetch(uri);
      const arrayBuffer = await response.arrayBuffer();
      fileBytes = new Uint8Array(arrayBuffer);
    } else {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: "base64",
      });
      fileBytes = base64ToUint8Array(base64);
    }

    // 중복 방지용 파일 경로
    const filePath = `recipes/${Date.now()}.jpg`;

    // 업로드
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, fileBytes, { contentType: "image/jpeg", upsert: true });

    if (error) {
      console.error("Upload error:", error.message);
      return null;
    }

    // Public URL 생성
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.error("Upload failed:", err);
    return null;
  }
};
