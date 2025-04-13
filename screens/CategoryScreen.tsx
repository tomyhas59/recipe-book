import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useRecoilValue } from "recoil";
import { selectedTheme } from "../recoil/themeState";
import { recipesState } from "../recoil/recipesState";
import { BASE_URL } from "../services/recipes";

type Props = {
  navigation: any;
};

const CategoryScreen: React.FC<Props> = ({ navigation }) => {
  const themeColors = useRecoilValue(selectedTheme);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "한식"
  );
  const recipes = useRecoilValue(recipesState);
  const categories = Array.from(
    new Set(["한식", "중식", "양식", "일식"].map((recipe) => recipe))
  );

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.category === selectedCategory)
    : [];

  return (
    <Container style={{ backgroundColor: themeColors.background }}>
      <Title style={{ color: themeColors.text }}>🍱 카테고리</Title>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 50, maxHeight: 50 }}
        renderItem={({ item }) => (
          <CategoryButton
            activeOpacity={0.7}
            onPress={() => setSelectedCategory(item)}
            style={{
              backgroundColor:
                item === selectedCategory
                  ? themeColors.primary
                  : themeColors.card,
            }}
          >
            <CategoryText
              style={{
                color:
                  item === selectedCategory
                    ? themeColors.buttonText
                    : themeColors.text,
              }}
            >
              {item}
            </CategoryText>
          </CategoryButton>
        )}
        keyExtractor={(item) => item}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      {selectedCategory && (
        <>
          <Subtitle style={{ color: themeColors.text }}>
            {selectedCategory} 레시피
          </Subtitle>
          <FlatList
            data={filteredRecipes}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RecipeDetail", { recipe: item })
                }
              >
                <RecipeCard
                  style={{
                    backgroundColor: themeColors.card,
                    borderColor: themeColors.border,
                  }}
                >
                  <RecipeImage source={{ uri: `${BASE_URL}${item.image}` }} />
                  <RecipeInfo>
                    <RecipeName style={{ color: themeColors.text }}>
                      {item.name}
                    </RecipeName>
                    <RecipeDescription
                      style={{ color: themeColors.text }}
                      numberOfLines={2}
                    >
                      {item.description}
                    </RecipeDescription>
                  </RecipeInfo>
                </RecipeCard>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 5px;
  padding-top: 50px;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Subtitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const CategoryButton = styled.TouchableOpacity`
  padding: 14px 18px;
  border-radius: 25px;
  margin-right: 12px;
`;

const CategoryText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const RecipeCard = styled.View`
  flex-direction: row;
  border-radius: 15px;
  padding: 12px;
  margin-bottom: 12px;
  border-width: 1px;
`;

const RecipeImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 15px;
`;

const RecipeInfo = styled.View`
  flex: 1;
  margin-left: 12px;
  justify-content: center;
`;

const RecipeName = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const RecipeDescription = styled.Text`
  font-size: 14px;
  margin-top: 5px;
`;

export default CategoryScreen;
