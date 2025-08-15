import React, { useState } from "react";
import { Button, Alert } from "react-native";
import styled from "styled-components/native";
import { recipeService } from "../services/recipeService";

import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "./LoginScreen";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/userState";

export default function RecipeFormScreen() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const navigation = useNavigation<NavigationProp>();
  const [user] = useRecoilState(userState);

  const handleSubmit = async () => {
    try {
      if (user?.id === undefined) {
        Alert.alert("오류", "유저 정보가 없습니다.");
        return;
      }

      await recipeService.create(user.id, {
        name,
        category,
        description,
        content,
        image,
      });

      Alert.alert("성공", "레시피가 등록되었습니다.");
      navigation.navigate("Home");
    } catch (err) {
      Alert.alert("실패", "다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Input placeholder="레시피 이름" value={name} onChangeText={setName} />
      <Input
        placeholder="카테고리"
        value={category}
        onChangeText={setCategory}
      />
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
      />
      <Input placeholder="이미지 URL" value={image} onChangeText={setImage} />
      <Button title="등록" onPress={handleSubmit} />
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
