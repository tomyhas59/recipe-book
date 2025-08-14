import React, { useEffect, useState } from "react";
import { FlatList, Button, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import { recipeService } from "../services/recipeService";
import { Recipe } from "../types/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "RecipeList">;

export default function RecipeListScreen({ navigation }: Props) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async () => {
    const data = await recipeService.getAll();
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Container>
      <Button
        title="레시피 등록"
        onPress={() => navigation.navigate("RecipeForm", {})}
      />
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id?.toString() || ""}
        renderItem={({ item }) => (
          <RecipeItem
            onPress={() =>
              navigation.navigate("RecipeDetail", { recipeId: item.id! })
            }
          >
            <Text>{item.name}</Text>
            <Text>{item.category}</Text>
          </RecipeItem>
        )}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const RecipeItem = styled.TouchableOpacity`
  padding: 15px;
  border-bottom-width: 1px;
  border-color: #ccc;
`;
