import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedTheme } from "../recoil/themeState";
import { userState } from "../recoil/userState";
import { BASE_URL, getRecipes, Recipe } from "../services/recipes";
import { recipesState } from "../recoil/recipesState";
import Carousel from "react-native-reanimated-carousel";

type Props = {
  navigation: any;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const themeColors = useRecoilValue(selectedTheme);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[] | null>(null);
  const [recipes, setRecipes] = useRecoilState(recipesState);
  const [recommendRecipes, setRecommendRecipes] = useState<Recipe[]>([]);
  const user = useRecoilValue(userState);
  const carouselRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecipes();
      setRecipes(data);

      // 랜덤하게 5개 추출
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setRecommendRecipes(shuffled.slice(0, 5));
    };

    fetchData();
  }, []);

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
      <RecipeImage
        source={{
          uri: `${BASE_URL}${item.image}`,
        }}
      />
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
          {user && <UserName>{user.email?.split("@")[0]}</UserName>}
          <HeaderText>Recipe Book</HeaderText>
        </Header>
        {filteredRecipes
          ? null
          : recommendRecipes.length > 1 && (
              <SwiperContainer>
                <Carousel
                  ref={carouselRef}
                  loop
                  autoPlay
                  width={Dimensions.get("window").width}
                  height={220}
                  data={recommendRecipes}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("RecipeDetail", { recipe: item })
                      }
                    >
                      <Slide key={item.id}>
                        <SlideImage
                          source={{
                            uri: `${BASE_URL}${item.image}`,
                          }}
                          resizeMode="cover"
                        />
                      </Slide>
                    </TouchableOpacity>
                  )}
                  autoPlayInterval={3000}
                />
              </SwiperContainer>
            )}

        <StickySearchBar
          style={{
            backgroundColor: themeColors.background,
            borderColor: themeColors.border,
          }}
        >
          <SearchBar
            placeholder="요리를 검색하세요."
            placeholderTextColor={themeColors.placeholder}
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
  position: relative;
  margin-bottom: 10px;
`;

const UserName = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 20px;
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
  padding: 5px;
  border-bottom-width: 1px;

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
