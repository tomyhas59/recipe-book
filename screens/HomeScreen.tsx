import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { Recipe, recipes } from "../data/recipes";
import { useRecoilValue } from "recoil";
import { selectedTheme } from "../recoil/themeState";

type Props = {
  navigation: any;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const themeColors = useRecoilValue(selectedTheme);
  const [searchQuery, setSearchQuery] = useState("");
  const { width } = useWindowDimensions();

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recommendRecipes = [...recipes]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  const renderItem = ({ item }: { item: Recipe }) => (
    <Card
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
      style={{
        backgroundColor: themeColors.card,
        borderColor: themeColors.border,
      }}
      key={item.id}
    >
      <RecipeImage source={item.image} />
      <CardContent>
        <RecipeName style={{ color: themeColors.text }}>{item.name}</RecipeName>
        <Description style={{ color: themeColors.text }} numberOfLines={2}>
          {item.description}
        </Description>
      </CardContent>
    </Card>
  );

  return (
    <Container style={{ backgroundColor: themeColors.background }}>
      <Logo>TMS Recipe</Logo>
      <SwiperContainer>
        <Swiper
          autoplay
          autoplayTimeout={3}
          showsPagination
          dotColor="#5e5e5e"
          activeDotColor="#465bf9"
        >
          {recommendRecipes.map((item) => (
            <Slide key={item.id}>
              <SlideImage source={item.image} resizeMode="cover" />
            </Slide>
          ))}
        </Swiper>
      </SwiperContainer>

      <SearchBar
        placeholder="요리를 검색하세요."
        placeholderTextColor="#777"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {filteredRecipes.map((item) => renderItem({ item }))}
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 5px;
  padding-top: 50px;
`;

const Logo = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: #ff4500;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: "Cochin";
  margin-bottom: 15px;
`;

const SwiperContainer = styled.View`
  height: 230px;
  margin-bottom: 20px;
`;

const Slide = styled.View`
  align-items: center;
`;

const SlideImage = styled.Image`
  width: 85%;
  height: 200px;
  border-radius: 18px;
`;

const SearchBar = styled.TextInput`
  background-color: #f9f9f9;
  padding: 14px;
  border-radius: 14px;
  font-size: 16px;
  margin-bottom: 18px;
  border: 1px solid #ccc;
`;

const Card = styled.TouchableOpacity`
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 16px;
  flex-direction: row;
  border-width: 1px;
  border-color: #ddd;
  background-color: white;
`;

const RecipeImage = styled.Image`
  width: 110px;
  height: 110px;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
`;

const CardContent = styled.View`
  flex: 1;
  padding: 14px;
  justify-content: center;
`;

const RecipeName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const Description = styled.Text`
  font-size: 14px;
  margin-top: 6px;
  color: #666;
`;

export default HomeScreen;
