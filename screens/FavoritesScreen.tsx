import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Recipe } from "../types/types";
import { recipeService } from "../services/recipeService";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "./LoginScreen";

export default function FavoritesScreen() {
  const [selected, setSelected] = useState<string>("한식");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const fetchRecipes = async () => {
    const data = await recipeService.getByCategory(selected);
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, [selected]);

  const screenWidth = 360;
  const cardWidth = (screenWidth - 30) / 2;

  return (
    <Container>
      {recipes.length > 0 && (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id?.toString() || ""}
          numColumns={2}
          renderItem={({ item }) => (
            <RecipeItem
              width={cardWidth}
              onPress={() =>
                navigation.navigate("HomeTab", {
                  screen: "RecipeDetail",
                  params: { recipeId: item.id! },
                })
              }
            >
              <RecipeImage />
              <RecipeName>{item.name}</RecipeName>
              <RecipeCategory>{item.category}</RecipeCategory>
              <RecipeDescription numberOfLines={2}>
                {item.description}
              </RecipeDescription>
            </RecipeItem>
          )}
        />
      )}
    </Container>
  );
}

const Container = styled.View`
  padding: 10px;
`;

interface CategoryProps {
  selected: boolean;
}

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

const RecipeItem = styled.TouchableOpacity<{ width: number }>`
  background-color: #fff;
  width: ${({ width }: { width: number }) => width}px;
  padding: 10px;
  margin: 5px;
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  elevation: 3;
`;

const RecipeImage = styled.View`
  width: 100%;
  height: 120px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const RecipeName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
`;

const RecipeCategory = styled.Text`
  font-size: 12px;
  color: #007aff;
  margin-bottom: 4px;
`;

const RecipeDescription = styled.Text`
  font-size: 12px;
  color: #666;
  line-height: 18px;
`;
