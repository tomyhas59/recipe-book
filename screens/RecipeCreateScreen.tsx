import React, { useRef, useState } from "react";
import {
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedTheme } from "../recoil/themeState";
import { addRecipe } from "../services/recipes";
import { supabase } from "../supabaseClient";
import { loadingState } from "../recoil/loadingState";
import { base64ToUint8Array } from "../utils/base64ToUint8Array";
import styled from "styled-components/native";

type Props = {
  navigation: any;
};

const RecipeCreateScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useRecoilValue(selectedTheme);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
  const [instructions, setInstructions] = useState([""]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null | undefined>(null);
  const setLoading = useSetRecoilState(loadingState);
  const ingredientsRefs = useRef<(TextInput | null)[]>([]);
  const instructionsRefs = useRef<(TextInput | null)[]>([]);

  const categories = ["한식", "중식", "일식", "양식"];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
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
    <Container style={{ flex: 1, backgroundColor: theme.background }}>
      <FormContainer
        contentContainerStyle={{ backgroundColor: theme.background }}
      >
        <StyledInput
          placeholder="레시피 이름"
          placeholderTextColor={theme.placeholder}
          value={name}
          onChangeText={setName}
          style={{
            borderColor: theme.border,
            color: theme.text,
          }}
        />

        <StyledDescriptionInput
          placeholder="설명"
          placeholderTextColor={theme.placeholder}
          value={description}
          onChangeText={setDescription}
          multiline
          style={{
            borderColor: theme.border,
            color: theme.text,
          }}
        />

        <SectionTitle style={{ color: theme.text }}>카테고리 선택</SectionTitle>
        <CategoryContainer>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              onPress={() => handleCategorySelect(category)}
              style={{
                borderColor: theme.border,
                backgroundColor:
                  selectedCategory === category ? theme.primary : "transparent",
              }}
            >
              <CategoryText
                style={{
                  color: selectedCategory === category ? "#fff" : theme.text,
                }}
              >
                {category}
              </CategoryText>
            </CategoryButton>
          ))}
        </CategoryContainer>

        {imageUri && (
          <StyledImage source={{ uri: imageUri }} resizeMode="cover" />
        )}

        <TouchableOpacity onPress={uploadImage}>
          <UploadText style={{ color: theme.primary }}>
            ＋ 이미지 선택
          </UploadText>
        </TouchableOpacity>

        <Text
          style={{ marginBottom: 8, color: theme.text, fontWeight: "bold" }}
        >
          재료
        </Text>
        {ingredients.map((item, index) => (
          <ItemWrapper key={index}>
            <ItemInput
              ref={(ref: TextInput | null) =>
                (ingredientsRefs.current[index] = ref)
              }
              placeholder="재료 이름"
              placeholderTextColor={theme.placeholder}
              value={item.name}
              onChangeText={(text: string) =>
                handleIngredientChange(index, "name", text)
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
                borderColor: theme.border,
                color: theme.text,
              }}
            />
            <AmountInput
              placeholder="양"
              placeholderTextColor={theme.placeholder}
              value={item.amount}
              onChangeText={(text: string) =>
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
                borderColor: theme.border,
                color: theme.text,
              }}
            />
          </ItemWrapper>
        ))}
        <TouchableOpacity onPress={handleAddIngredient}>
          <Text style={{ color: theme.primary, marginBottom: 12 }}>
            ＋ 재료 추가
          </Text>
        </TouchableOpacity>

        <Text
          style={{ marginBottom: 8, color: theme.text, fontWeight: "bold" }}
        >
          조리 순서
        </Text>
        {instructions.map((step, index) => (
          <ItemInput
            key={index}
            ref={(ref: TextInput | null) =>
              (instructionsRefs.current[index] = ref)
            }
            placeholder={`단계 ${index + 1}`}
            placeholderTextColor={theme.placeholder}
            value={step}
            onChangeText={(text: string) =>
              handleInstructionChange(index, text)
            }
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
      </FormContainer>
    </Container>
  );
};

export default RecipeCreateScreen;

const Container = styled.View`
  flex: 1;
`;

const FormContainer = styled.ScrollView`
  padding: 20px;
`;

const StyledInput = styled.TextInput`
  border-bottom-width: 1px;
  font-size: 16px;
  padding: 8px 0;
  margin-bottom: 16px;
`;

const StyledDescriptionInput = styled.TextInput`
  border-width: 1px;
  border-radius: 8px;
  padding: 12px;
  height: 120px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const CategoryContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  gap: 8px;
`;

const CategoryButton = styled.TouchableOpacity`
  padding: 10px 16px;
  border-radius: 20px;
  border-width: 1px;
`;

const CategoryText = styled.Text`
  font-size: 14px;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 220px;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const UploadText = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 24px;
  font-weight: 500;
`;

const ItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const ItemInput = styled.TextInput`
  flex: 1;
  border-bottom-width: 1px;
  font-size: 16px;
  padding: 8px 4px;
`;

const AmountInput = styled.TextInput`
  width: 80px;
  border-bottom-width: 1px;
  font-size: 16px;
  padding: 8px 4px;
  margin-left: 8px;
`;
