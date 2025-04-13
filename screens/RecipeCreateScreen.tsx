import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedTheme } from "../recoil/themeState";
import { addRecipe } from "../services/recipes";
import { supabase } from "../supabaseClient";
import { loadingState } from "../recoil/loadingState";
import { base64ToUint8Array } from "../utils/base64ToUint8Array";

type Props = {
  navigation: any;
};

const RecipeCreateScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useRecoilValue(selectedTheme);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // 단일 카테고리 선택
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
  const [instructions, setInstructions] = useState([""]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null | undefined>(null);
  const setLoading = useSetRecoilState(loadingState);
  const ingredientsRefs = useRef<(TextInput | null)[]>([]);
  const instructionsRefs = useRef<(TextInput | null)[]>([]);

  const categories = ["한식", "중식", "일식", "양식"];

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("사진 접근 권한이 필요합니다!");
      }
    })();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category); // 카테고리 변경 시 이전 선택을 덮어쓰도록 설정
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  const handleIngredientChange = (
    index: number,
    field: "name" | "amount",
    value: string
  ) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleInstructionChange = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const uploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (result.canceled || !result.assets?.length) return;

    const image = result.assets[0];
    const imageUri = image.uri;
    const fileName = image.uri.split("/").pop() || `img-${Date.now()}.jpg`;

    setImageUri(imageUri);
    setImageFileName(fileName);
    setImageData(image.base64);
  };

  const handleSubmit = async () => {
    if (!imageData) {
      console.error("❌ base64 데이터 없음");
      return;
    }

    if (!selectedCategory) {
      Alert.alert("카테고리를 선택해주세요.");
      return;
    }

    setLoading(true);
    try {
      const fileData = base64ToUint8Array(imageData);

      const { data, error } = await supabase.storage
        .from("recipe-book-image")
        .upload(`recipe-image/${imageFileName}`, fileData, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (error) {
        console.error("❌ 업로드 실패:", error);
      } else {
        console.log("✅ 업로드 성공:", data);
      }

      const newRecipe = {
        name,
        description,
        category: selectedCategory, // 선택된 카테고리
        ingredients,
        instructions,
        image: imageFileName,
      };

      await addRecipe(newRecipe);
      Alert.alert("등록 완료");
      navigation.navigate("Main", { screen: "Home" });
    } catch (error) {
      console.error("레시피 등록 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16, backgroundColor: theme.background }}
    >
      <TextInput
        placeholder="레시피 이름"
        placeholderTextColor={theme.placeholder}
        value={name}
        onChangeText={setName}
        style={{
          marginBottom: 12,
          borderBottomWidth: 1,
          borderColor: theme.border,
          color: theme.text,
        }}
      />

      <TextInput
        placeholder="설명"
        placeholderTextColor={theme.placeholder}
        value={description}
        onChangeText={setDescription}
        multiline
        style={{
          height: 100,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: theme.border,
          color: theme.text,
          padding: 8,
        }}
      />

      <Text style={{ marginBottom: 8, color: theme.text, fontWeight: "bold" }}>
        카테고리 선택
      </Text>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 12 }}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => handleCategorySelect(cat)}
            style={{
              padding: 8,
              margin: 4,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor:
                selectedCategory === cat ? theme.primary : "transparent",
            }}
          >
            <Text
              style={{ color: selectedCategory === cat ? "#fff" : theme.text }}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 8,
            marginBottom: 12,
          }}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity onPress={uploadImage}>
        <Text style={{ color: theme.primary, marginBottom: 16 }}>
          ＋ 이미지 선택
        </Text>
      </TouchableOpacity>

      <Text style={{ marginBottom: 8, color: theme.text, fontWeight: "bold" }}>
        재료
      </Text>
      {ingredients.map((item, index) => (
        <View key={index} style={{ flexDirection: "row", marginBottom: 8 }}>
          <TextInput
            ref={(ref) => (ingredientsRefs.current[index] = ref)}
            placeholder="재료 이름"
            placeholderTextColor={theme.placeholder}
            value={item.name}
            onChangeText={(text) => handleIngredientChange(index, "name", text)}
            onSubmitEditing={() => {
              if (index === ingredients.length - 1) {
                handleAddIngredient();
                setTimeout(() => {
                  ingredientsRefs.current[index + 1]?.focus();
                }, 100);
              } else {
                ingredientsRefs.current[index + 1]?.focus();
              }
            }}
            style={{
              flex: 1,
              marginRight: 8,
              borderBottomWidth: 1,
              borderColor: theme.border,
              color: theme.text,
            }}
          />
          <TextInput
            placeholder="양"
            placeholderTextColor={theme.placeholder}
            value={item.amount}
            onChangeText={(text) =>
              handleIngredientChange(index, "amount", text)
            }
            onSubmitEditing={() => {
              if (index === ingredients.length - 1) {
                handleAddIngredient();
                setTimeout(() => {
                  ingredientsRefs.current[index + 1]?.focus();
                }, 100);
              } else {
                ingredientsRefs.current[index + 1]?.focus();
              }
            }}
            style={{
              width: 80,
              borderBottomWidth: 1,
              borderColor: theme.border,
              color: theme.text,
            }}
          />
        </View>
      ))}
      <TouchableOpacity onPress={handleAddIngredient}>
        <Text style={{ color: theme.primary, marginBottom: 12 }}>
          ＋ 재료 추가
        </Text>
      </TouchableOpacity>

      <Text style={{ marginBottom: 8, color: theme.text, fontWeight: "bold" }}>
        조리 순서
      </Text>
      {instructions.map((step, index) => (
        <TextInput
          key={index}
          ref={(ref) => (instructionsRefs.current[index] = ref)}
          placeholder={`단계 ${index + 1}`}
          placeholderTextColor={theme.placeholder}
          value={step}
          onChangeText={(text) => handleInstructionChange(index, text)}
          onSubmitEditing={() => {
            if (index === instructions.length - 1) {
              handleAddInstruction();
              setTimeout(() => {
                instructionsRefs.current[index + 1]?.focus();
              }, 100);
            } else {
              instructionsRefs.current[index + 1]?.focus();
            }
          }}
          style={{
            marginBottom: 8,
            borderBottomWidth: 1,
            borderColor: theme.border,
            color: theme.text,
          }}
        />
      ))}
      <TouchableOpacity onPress={handleAddInstruction}>
        <Text style={{ color: theme.primary, marginBottom: 24 }}>
          ＋ 조리 단계 추가
        </Text>
      </TouchableOpacity>

      <Button
        title="레시피 등록"
        onPress={handleSubmit}
        color={theme.primary}
      />
    </ScrollView>
  );
};

export default RecipeCreateScreen;
