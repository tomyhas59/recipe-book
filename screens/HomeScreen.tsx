import React, { useMemo, useState } from "react";
import { ScrollView } from "react-native";
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
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[] | null>(null);

  const initialRecommendRecipes = useMemo(
    () => [...recipes].sort(() => Math.random() - 0.5).slice(0, 5),
    []
  );

  const [recommendRecipes] = useState(initialRecommendRecipes);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredRecipes(null);
    } else {
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setFilteredRecipes(null);
  };

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
      <ScrollView stickyHeaderIndices={[2]}>
        <Header style={{ backgroundColor: themeColors.primary }}>
          <HeaderText>Recipe Book</HeaderText>
        </Header>
        {filteredRecipes ? null : (
          <SwiperContainer>
            <Swiper
              autoplay
              autoplayTimeout={3}
              showsPagination
              dotColor="#bbb"
              activeDotColor="#ff6b6b"
            >
              {recommendRecipes.map((item) => (
                <Slide key={item.id}>
                  <SlideImage source={item.image} resizeMode="cover" />
                </Slide>
              ))}
            </Swiper>
          </SwiperContainer>
        )}

        <StickySearchBar
          style={{
            backgroundColor: themeColors.background,
            color: themeColors.text,
            borderColor: themeColors.border,
          }}
        >
          <SearchBar
            placeholder="요리를 검색하세요."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            style={{
              backgroundColor: themeColors.inputBackground,
              color: themeColors.text,
              borderColor: themeColors.border,
            }}
          />
          <SearchButton
            onPress={handleSearch}
            style={{ backgroundColor: themeColors.primary }}
          >
            <SearchButtonText>검색</SearchButtonText>
          </SearchButton>
          <ResetButton onPress={handleReset}>
            <ResetButtonText>초기화</ResetButtonText>
          </ResetButton>
        </StickySearchBar>

        {(filteredRecipes ?? recipes).length > 0 ? (
          (filteredRecipes ?? recipes).map((item) => renderItem({ item }))
        ) : (
          <NoResultsText>검색된 요리가 없습니다...</NoResultsText>
        )}
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 50px;
`;

const Header = styled.View`
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const SwiperContainer = styled.View`
  height: 220px;
`;

const Slide = styled.View`
  align-items: center;
`;

const SlideImage = styled.Image`
  width: 90%;
  height: 200px;
  border-radius: 14px;
`;

const StickySearchBar = styled.View`
  flex-direction: row;
  background-color: white;
  padding: 5px;
  border-bottom-width: 1px;
  border-color: #ddd;
  z-index: 10;
  align-items: center;
`;

const SearchBar = styled.TextInput`
  flex: 1;
  background-color: white;
  padding: 14px;
  border-radius: 14px;
  font-size: 16px;
  border-width: 1px;
  border-color: #ddd;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: #ff6b6b;
  padding: 14px 10px;
  border-radius: 14px;
`;

const SearchButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
const ResetButton = styled.TouchableOpacity`
  background-color: #ccc;
  padding: 14px 10px;
  border-radius: 14px;
`;

const ResetButtonText = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;

const NoResultsText = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #ff6b6b;
  margin-top: 20px;
`;

const Card = styled.TouchableOpacity`
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 14px;
  flex-direction: row;
  border-width: 1px;
  border-color: #ddd;
  background-color: white;
`;

const RecipeImage = styled.Image`
  width: 100px;
  height: 100px;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
`;

const CardContent = styled.View`
  flex: 1;
  padding: 14px;
  justify-content: center;
`;

const RecipeName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Description = styled.Text`
  font-size: 14px;
  margin-top: 6px;
  color: #666;
`;

export default HomeScreen;
