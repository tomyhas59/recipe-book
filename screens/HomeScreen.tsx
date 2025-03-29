import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { recipes, Recipe } from "../data/recipes";

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const scrollViewRef = useRef<ScrollView | null>(null);
  const filteredRecipes =
    selectedCategory === "전체"
      ? recipes
      : recipes.filter((recipe) => recipe.category === selectedCategory);

  const categories = ["전체", "한식", "중식", "양식", "일식"];

  const scrollToCategory = (direction: "left" | "right") => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: direction === "right" ? 500 : -500,
        animated: true,
      });
    }
  };

  return (
    <Container>
      <Title>레시피 목록</Title>
      <NavbarContainer>
        <ScrollButton onPress={() => scrollToCategory("left")}>
          <ScrollButtonText>{"<"}</ScrollButtonText>
        </ScrollButton>

        <ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: "row" }}
        >
          {categories.map((category) => (
            <NavButton
              key={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            >
              <NavButtonText selected={selectedCategory === category}>
                {category}
              </NavButtonText>
            </NavButton>
          ))}
        </ScrollView>

        <ScrollButton onPress={() => scrollToCategory("right")}>
          <ScrollButtonText>{">"}</ScrollButtonText>
        </ScrollButton>
      </NavbarContainer>

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        renderItem={({ item }: { item: Recipe }) => (
          <RecipeItem>
            <RecipeImage source={item.image} />
            <RecipeName>{item.name}</RecipeName>
            <RecipeButton
              onPress={() =>
                navigation.navigate("RecipeDetails", { recipe: item })
              }
            >
              <RecipeButtonText>자세히 보기</RecipeButtonText>
            </RecipeButton>
          </RecipeItem>
        )}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  background-color: #9ceaff;
  padding: 15px;
  border-radius: 20px;
  color: #2b385a;
  margin-block: 23px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const NavbarContainer = styled.View`
  flex-direction: row;
  width: 400px;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
`;

const NavButton = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 12px 14px;
  margin: 0 8px;
  border-radius: 25px;
  border: 1px solid #008cba;
  background-color: ${(props) => (props.selected ? "#008CBA" : "#fff")};
  align-items: center;
`;

const NavButtonText = styled.Text<{ selected: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.selected ? "#fff" : "#008CBA")};
`;

const ScrollButton = styled.TouchableOpacity`
  background-color: #fff;
  padding: 15px;
  border-radius: 20px;
  border: 1px solid #008cba;
  justify-content: center;
  align-items: center;
`;

const ScrollButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #008cba;
`;

const RecipeItem = styled.View`
  margin: 10px;
  background-color: #fff;
  border-radius: 15px;
  padding: 15px;
  align-items: center;
  overflow: hidden;
`;

const RecipeImage = styled.Image`
  width: 100%;
  height: 120px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const RecipeName = styled.Text`
  font-size: 18px;
  font-weight: bold;

  color: #333;
  margin-bottom: 10px;
  text-align: center;
`;

const RecipeButton = styled.TouchableOpacity`
  background-color: #9be6ff;
  padding: 8px 20px;
  border-radius: 25px;
`;

const RecipeButtonText = styled.Text`
  font-size: 14px;
  color: #4a4a4a;
  font-weight: 600;
`;

export default HomeScreen;
