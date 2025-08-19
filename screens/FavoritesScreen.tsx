import React, { useEffect } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Recipe } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "./LoginScreen";
import { favoriteService } from "../services/favoritesService";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import { favoritesState } from "../recoil/favoritesState";
import RecipeItem from "../components/RecipeItem";

export default function FavoritesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [user] = useRecoilState(userState);
  const [favorites, setFavorites] = useRecoilState(favoritesState);

  const fetchFavorites = async () => {
    if (user?.id === undefined) return;

    const data = await favoriteService.getFavorites(user.id);
    setFavorites(data);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const recipes: Recipe[] = favorites.map((fav) => fav.recipe);

  return (
    <Container>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id?.toString() || ""}
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
