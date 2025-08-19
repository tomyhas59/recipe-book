import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { Recipe } from "../types/types";
import { recipeService } from "../services/recipeService";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "./LoginScreen";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import RecipeItem from "../components/RecipeItem";
import { favoriteService } from "../services/favoritesService";

export const CATEGORIES = ["한식", "양식", "일식", "중식"];

export default function CategoryScreen() {
  const [selected, setSelected] = useState<string>("한식");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const [user] = useRecoilState(userState);

  const fetchRecipes = async () => {
    const data = await recipeService.getByCategory(selected);

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
    fetchRecipes();
  }, [selected]);

  return (
    <Container>
      <CategoryBar>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {CATEGORIES.map((category, index) => (
            <TouchableOpacity key={index} onPress={() => setSelected(category)}>
              <Category selected={selected === category}>
                <CategoryText selected={selected === category}>
                  {category}
                </CategoryText>
              </Category>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </CategoryBar>

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

interface CategoryProps {
  selected: boolean;
}

const CategoryBar = styled.View`
  padding: 10px 0;
  background-color: #fff;
`;

const Category = styled.View<CategoryProps>`
  border: 1px solid
    ${({ selected }: { selected: boolean }) => (selected ? "#007AFF" : "#ccc")};
  background-color: ${({ selected }: { selected: boolean }) =>
    selected ? "#007AFF" : "white"};
  border-radius: 20px;
  padding: 10px 16px;
  margin-right: 8px;
`;

const CategoryText = styled.Text<CategoryProps>`
  color: ${({ selected }: { selected: boolean }) =>
    selected ? "white" : "black"};
  font-weight: 500;
`;
