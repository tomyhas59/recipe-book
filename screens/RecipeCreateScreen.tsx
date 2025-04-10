import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useRecoilValue } from "recoil";
import { selectedTheme } from "../recoil/themeState";
import { addRecipe } from "../services/recipes";
import { supabase } from "../supabaseClient";

type Props = {
  navigation: any;
};

const RecipeCreateScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useRecoilValue(selectedTheme);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
  const [instructions, setInstructions] = useState([""]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);

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

  const handleSubmit = async () => {
    try {
      const newRecipe = {
        name,
        description,
        category,
        ingredients,
        instructions,
        image: "",
      };

      await addRecipe(newRecipe); // DB 저장
      navigation.goBack(); // 등록 후 이전 화면으로
    } catch (error) {
      console.error("레시피 등록 실패:", error);
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

      <TextInput
        placeholder="카테고리 (예: 한식, 중식)"
        placeholderTextColor={theme.placeholder}
        value={category}
        onChangeText={setCategory}
        style={{
          marginBottom: 12,
          borderBottomWidth: 1,
          borderColor: theme.border,
          color: theme.text,
        }}
      />

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

      <TouchableOpacity onPress={() => null}>
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
            placeholder="재료 이름"
            placeholderTextColor={theme.placeholder}
            value={item.name}
            onChangeText={(text) => handleIngredientChange(index, "name", text)}
            onSubmitEditing={() => {
              if (index === ingredients.length - 1) {
                handleAddIngredient();
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
          placeholder={`단계 ${index + 1}`}
          placeholderTextColor={theme.placeholder}
          value={step}
          onChangeText={(text) => handleInstructionChange(index, text)}
          onSubmitEditing={() => {
            // 마지막 재료일 때만 새 항목 추가
            if (index === ingredients.length - 1) {
              handleAddInstruction();
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
