import React from "react";
import styled from "styled-components/native";
import { Recipe } from "../types/types";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacityProps } from "react-native";

interface RecipeItemProps extends TouchableOpacityProps {
  recipe: Recipe & { isFavorite?: boolean };
  width: number;
  onPress?: () => void;
  showFavorite?: boolean;
}

export default function RecipeItem({
  recipe,
  width,
  onPress,
  showFavorite = true,
  ...props
}: RecipeItemProps) {
  return (
    <Container width={width} onPress={onPress} {...props}>
      <RecipeImage />

      {showFavorite && recipe.isFavorite !== undefined && (
        <FavoriteIconWrapper>
          <Ionicons
            name={recipe.isFavorite ? "star" : "star-outline"}
            size={24}
            color={recipe.isFavorite ? "#FFD700" : "#888"}
          />
        </FavoriteIconWrapper>
      )}

      <RecipeInfo>
        <RecipeName>{recipe.name}</RecipeName>
        <RecipeCategory>{recipe.category}</RecipeCategory>
        <RecipeDescription numberOfLines={2}>
          {recipe.description}
        </RecipeDescription>
      </RecipeInfo>
    </Container>
  );
}

const Container = styled.TouchableOpacity<{ width: number }>`
  background-color: #fff;
  width: ${({ width }: { width: number }) => width}px;
  padding: 12px;
  margin: 5px;
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  elevation: 3;
  position: relative;
`;

const FavoriteIconWrapper = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
`;

const RecipeImage = styled.View`
  width: 100%;
  height: 120px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const RecipeInfo = styled.View`
  padding-top: 4px;
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
  margin-bottom: 6px;
`;

const RecipeDescription = styled.Text`
  font-size: 12px;
  color: #666;
  line-height: 18px;
  margin-bottom: 4px;
`;
