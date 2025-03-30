import React, { useState } from "react";
import { Button, FlatList } from "react-native";
import styled from "styled-components/native";
import { Recipe, recipes } from "../data/recipes";

const FavoritesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [favorites, setFavorites] = useState<Recipe[]>([
    recipes[0], // 김치찌개
    recipes[1], // 불고기
  ]);

  const handleRemoveFavorite = (id: number) => {
    setFavorites(favorites.filter((recipe) => recipe.id !== id));
  };

  return (
    <Container>
      <Title>즐겨찾기 레시피</Title>
      {favorites.length === 0 ? (
        <Message>즐겨찾기 목록이 비어있습니다.</Message>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RecipeContainer>
              <Button
                title={item.name} // 레시피 이름을 버튼에 표시
                onPress={() =>
                  navigation.navigate("RecipeDetails", { recipe: item })
                }
              />
              <Button
                title="제거"
                onPress={() => handleRemoveFavorite(item.id)}
              />
            </RecipeContainer>
          )}
        />
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Message = styled.Text`
  font-size: 18px;
  color: gray;
`;

const RecipeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom-width: 1px;
  border-color: #ddd;
  width: 100%;
`;

export default FavoritesScreen;
