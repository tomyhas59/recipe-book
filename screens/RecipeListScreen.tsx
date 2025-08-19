import React, { useEffect } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { recipeService } from "../services/recipeService";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "./LoginScreen";
import { recipesState } from "../recoil/recipesState";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import { favoriteService } from "../services/favoritesService";
import RecipeItem from "../components/RecipeItem";

export default function RecipeListScreen() {
  const [recipes, setRecipes] = useRecoilState(recipesState);
  const navigation = useNavigation<NavigationProp>();
  const [user] = useRecoilState(userState);

  const fetchRecipes = async () => {
    const data = await recipeService.getAll();

    if (user?.id) {
      const recipesWithFav = await Promise.all(
        data.map(async (recipe) => ({
          ...recipe,
          isFavorite: await favoriteService.isFavorite(user.id!, recipe.id!),
        }))
      );
      setRecipes(recipesWithFav);
    } else {
      setRecipes(data);
    }
  };

  useEffect(() => {
    if (recipes.length === 0) {
      fetchRecipes();
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      const fetchWithFavorites = async () => {
        const recipesWithFav = await Promise.all(
          recipes.map(async (recipe) => ({
            ...recipe,
            isFavorite: await favoriteService.isFavorite(user.id!, recipe.id!),
          }))
        );
        setRecipes(recipesWithFav);
      };

      fetchWithFavorites();
    }
  }, [user]);

  console.log(recipes);

  return (
    <Container>
      <FlatList
        data={recipes}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : `recipe-${index}`
        }
        numColumns={2}
        renderItem={({ item }) => (
          <RecipeItem
            recipe={item}
            showFavorite={!!user}
            onPress={() =>
              navigation.navigate("HomeTab", {
                screen: "RecipeDetail",
                params: { recipeId: item.id! },
              })
            }
          />
        )}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 10px;
`;
