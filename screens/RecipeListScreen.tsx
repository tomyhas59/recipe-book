import React, { useEffect, useState } from "react";
import { FlatList, Button, Text } from "react-native";
import styled from "styled-components/native";
import { recipeService } from "../services/recipeService";
import { Recipe } from "../types/types";
import { useNavigation } from "@react-navigation/native";

import { NavigationProp } from "./LoginScreen";

export default function RecipeListScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const fetchRecipes = async () => {
    const data = await recipeService.getAll();
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const screenWidth = 360;
  const cardWidth = (screenWidth - 30) / 2;

  return (
    <Container>
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
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 10px;
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
