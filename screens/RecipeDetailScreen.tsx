import React from "react";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";

const RecipeDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { recipe } = route.params;

  return (
    <Container>
      <Title>{recipe.name}</Title>
      <SectionContainer>
        <SectionTitle>재료</SectionTitle>
        <FlatList
          data={recipe.ingredients}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <IngredientRow>
              <IngredientName>{item.name}</IngredientName>
              <IngredientAmount>{item.amount}</IngredientAmount>
            </IngredientRow>
          )}
        />
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>조리법</SectionTitle>
        <FlatList
          data={recipe.instructions}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Instructions>
              {index + 1}. {item}
            </Instructions>
          )}
        />
      </SectionContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f8f8f8;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const SectionContainer = styled.View`
  background-color: #fff;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const SectionTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #444;
`;

const IngredientRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-bottom-width: 1px;
  border-color: #ddd;
  margin-block: 5px;
`;

const IngredientName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const IngredientAmount = styled.Text`
  font-size: 18px;
  color: #666;
`;

const Instructions = styled.Text`
  margin-bottom: 12px;
  font-size: 16px;
`;

export default RecipeDetailScreen;
