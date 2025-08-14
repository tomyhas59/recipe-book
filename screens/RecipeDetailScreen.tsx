import React, { useEffect, useState } from "react";
import { Text, Button, ScrollView } from "react-native";
import styled from "styled-components/native";
import { recipeService } from "../services/recipeService";
import { favoriteService } from "../services/favoritesService";
import { Recipe } from "../types/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "RecipeDetail">;

export default function RecipeDetailScreen({ route }: Props) {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const fetchRecipe = async () => {
    const data = await recipeService.getById(recipeId);
    setRecipe(data);
  };

  const toggleFavorite = async () => {
    await favoriteService.toggle(recipeId);
    fetchRecipe();
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  if (!recipe) return <Text>Loading...</Text>;

  return (
    <Container>
      <Title>{recipe.name}</Title>
      <Category>{recipe.category}</Category>
      <Content>{recipe.content}</Content>
      <Button title="즐겨찾기" onPress={toggleFavorite} />
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  padding: 15px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Category = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Content = styled.Text`
  font-size: 16px;
  margin-bottom: 20px;
`;
