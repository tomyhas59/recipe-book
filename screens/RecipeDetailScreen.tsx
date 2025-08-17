import React, { useEffect, useState } from "react";
import { Text, Alert, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { recipeService } from "../services/recipeService";
import { favoriteService } from "../services/favoritesService";
import { Favorite, Recipe } from "../types/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigation/TabNavigator";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import Ionicons from "react-native-vector-icons/Ionicons";
import { favoritesState } from "../recoil/favoritesState";
import { recipesState } from "./../recoil/recipesState";

type Props = NativeStackScreenProps<HomeStackParamList, "RecipeDetail">;

export default function RecipeDetailScreen({ route }: Props) {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const [user] = useRecoilState(userState);
  const setFavorites = useSetRecoilState(favoritesState);
  const setRecipes = useSetRecoilState(recipesState);

  const fetchRecipe = async () => {
    const data = await recipeService.getById(recipeId);
    setRecipe(data);

    if (user?.id) {
      const favStatus = await favoriteService.isFavorite(user.id, recipeId);
      setIsFavorite(favStatus);
    }
  };

  const toggleFavorite = async () => {
    if (!user?.id) {
      Alert.alert("로그인 후 가능합니다");
      return;
    }

    try {
      await favoriteService.toggle(user.id, recipeId);

      if (!recipe) return;

      if (isFavorite) {
        // 즐겨찾기 제거
        setFavorites((prev) => prev.filter((f) => f.recipe.id !== recipe.id));
      } else {
        // 즐겨찾기 추가
        const newFav: Favorite = { id: undefined, userId: user.id, recipe };
        setFavorites((prev) => [...prev, newFav]);
      }

      setRecipes((prev) =>
        prev.map((r) =>
          r.id === recipe.id ? { ...r, isFavorite: !isFavorite } : r
        )
      );

      setIsFavorite(!isFavorite);
    } catch (error) {
      Alert.alert("즐겨찾기 업데이트 실패");
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);

  if (!recipe) return <Text>Loading...</Text>;

  return (
    <Container>
      <Title>{recipe.name}</Title>
      <Category>{recipe.category}</Category>
      <Content>{recipe.content}</Content>

      {user && (
        <FavoriteButton onPress={toggleFavorite} active={isFavorite}>
          <Ionicons
            name={isFavorite ? "star" : "star-outline"}
            size={24}
            color={isFavorite ? "#FFD700" : "#888"}
          />
          <FavoriteText active={isFavorite}>즐겨찾기</FavoriteText>
        </FavoriteButton>
      )}
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
  color: #007aff;
`;

const Content = styled.Text`
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 22px;
`;

const FavoriteButton = styled.TouchableOpacity<{ active: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  background-color: ${({ active }: { active: boolean }) =>
    active ? "#fffbe6" : "#f0f0f0"};
  border-radius: 25px;
  border: ${({ active }: { active: boolean }) =>
    active ? "1px solid #FFD700" : "1px solid #ccc"};
  align-self: flex-start;
`;

const FavoriteText = styled.Text<{ active: boolean }>`
  margin-left: 8px;
  font-size: 14px;
  color: ${({ active }: { active: boolean }) => (active ? "#FFD700" : "#555")};
  font-weight: 500;
`;
