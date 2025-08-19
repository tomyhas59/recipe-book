import React, { useState } from "react";
import { Button, Alert, Image } from "react-native";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import { recipeService } from "../services/recipeService";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "./LoginScreen";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import { uploadImage } from "../utils/uploadImage";
import { CATEGORIES } from "./CategoryScreen";

export default function RecipeFormScreen() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [localImageUri, setLocalImageUri] = useState<string | null>(null); // 로컬 프리뷰
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const [user] = useRecoilState(userState);

  // 이미지 선택 (업로드 X, 로컬 경로만 저장)
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setLocalImageUri(result.assets[0].uri);
    }
  };

  // 레시피 등록 (여기서 업로드 + DB 저장)
  const handleSubmit = async () => {
    try {
      if (uploading) return;
      setUploading(true);

      if (!user?.id) {
        Alert.alert("오류", "유저 정보가 없습니다.");
        return;
      }

      if (!name || !category || !description || !content) {
        Alert.alert("입력 오류", "모든 필드를 입력해주세요.");
        return;
      }

      if (!localImageUri) {
        Alert.alert("입력 오류", "이미지를 선택해주세요.");
        return;
      }

      // 이미지 업로드
      const uploadedUrl = await uploadImage(localImageUri, "recipe-images");
      if (!uploadedUrl) {
        Alert.alert("실패", "이미지 업로드에 실패했습니다.");
        return;
      }

      // 레시피 등록
      const recipeData = {
        name,
        category,
        description,
        content,
        image: uploadedUrl, // 업로드 성공한 URL만 저장
        creatorId: user.id,
      };

      await recipeService.create(user.id, recipeData);

      Alert.alert("성공", "레시피가 등록되었습니다.");
      navigation.navigate("HomeTab", { screen: "RecipeList" });
    } catch (err: any) {
      Alert.alert("실패", err.message || "레시피 등록에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container>
      <Input placeholder="레시피 이름" value={name} onChangeText={setName} />
      <CategoryContainer>
        {CATEGORIES.map((cat) => (
          <CategoryButton
            key={cat}
            selected={category === cat}
            onPress={() => setCategory(cat)}
          >
            <CategoryText selected={category === cat}>{cat}</CategoryText>
          </CategoryButton>
        ))}
      </CategoryContainer>
      <Input
        placeholder="설명"
        value={description}
        onChangeText={setDescription}
      />
      <Input
        placeholder="내용"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={10}
      />

      <Button title="이미지 선택" onPress={handlePickImage} />
      {localImageUri && (
        <PreviewImage source={{ uri: localImageUri }} resizeMode="cover" />
      )}

      <Button
        title={uploading ? "등록 중..." : "레시피 등록"}
        onPress={handleSubmit}
        disabled={uploading}
      />
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
`;

const CategoryContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const CategoryButton = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.selected ? "#4caf50" : "#f0f0f0")};
`;

const CategoryText = styled.Text<{ selected: boolean }>`
  color: ${(props) => (props.selected ? "white" : "black")};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
`;

const PreviewImage = styled(Image)`
  width: 100%;
  height: 200px;
  margin: 15px 0;
  border-radius: 10px;
`;
