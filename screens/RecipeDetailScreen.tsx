import React, { useState, useEffect } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedTheme } from "../recoil/themeState";
import { StackScreenProps } from "@react-navigation/stack";
import { favoritesState } from "../recoil/favoritesState";
import { userState } from "../recoil/userState";

import {
  addToFavorites,
  removeFavoriteFromFirestore,
  checkFavorite,
} from "../services/favorites";
import { RootStackParamList } from "../navigation/AppNavigator";
import { BASE_URL } from "../services/recipes";
import { loadingState } from "../recoil/loadingState";

type Props = StackScreenProps<RootStackParamList, "RecipeDetail">;

const DetailRecipeScreen: React.FC<Props> = ({ route, navigation }) => {
  const { recipe } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const themeColors = useRecoilValue(selectedTheme);
  const user = useRecoilValue(userState);
  const setLoading = useSetRecoilState(loadingState);

  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    const fetchFavorite = async () => {
      if (user && recipe?.id) {
        const result = await checkFavorite(user.uid, recipe.id);
        setIsFavorite(result);
      }
    };

    fetchFavorite();
  }, [user, recipe?.id]);

  const toggleFavorite = async () => {
    setLoading(true);
    if (!user) {
      setNotice(true);
      setLoading(false);
      return;
    }

    try {
      let updatedFavorites = [...favorites];

      if (isFavorite) {
        await removeFavoriteFromFirestore(user.uid, recipe.id);
        updatedFavorites = updatedFavorites.filter(
          (fav) => fav.recipeId !== recipe.id
        );
      } else {
        await addToFavorites(recipe, user.uid);

        updatedFavorites = [
          ...updatedFavorites,
          {
            userId: user.uid,
            ...recipe,
            recipeId: recipe.id,
          },
        ];
      }

      setFavorites(updatedFavorites);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("즐겨찾기 저장 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: themeColors.background }}>
      <Container>
        <RecipeImage
          source={{
            uri: `${BASE_URL}${recipe.image}`,
          }}
        />
        <Title style={{ color: themeColors.text }}>{recipe.name}</Title>
        <Category style={{ color: themeColors.text }}>
          {recipe.category}
        </Category>
        <Description style={{ color: themeColors.text }}>
          {recipe.description}
        </Description>

        <SectionContainer style={{ borderBottomColor: themeColors.border }}>
          <SectionTitle style={{ color: themeColors.text }}>
            📌 재료
          </SectionTitle>
        </SectionContainer>
        <View>
          {Object.values(recipe.ingredients ?? {}).map?.(
            (item: { name: string; amount: string }, index: number) => (
              <IngredientItem key={index} style={{ color: themeColors.text }}>
                - {item.name} ({item.amount})
              </IngredientItem>
            )
          )}
        </View>

        <SectionContainer style={{ borderBottomColor: themeColors.border }}>
          <SectionTitle style={{ color: themeColors.text }}>
            🍳 조리 방법
          </SectionTitle>
        </SectionContainer>
        <View>
          {recipe.instructions?.map?.((item: string, index: number) => (
            <StepItem key={index} style={{ color: themeColors.text }}>
              {index + 1}. {item}
            </StepItem>
          ))}
        </View>
        <FavoriteButton
          onPress={toggleFavorite}
          style={{ backgroundColor: themeColors.button }}
        >
          {notice ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Main", { screen: "Sign" })}
            >
              <Notice>로그인하러 가기</Notice>
            </TouchableOpacity>
          ) : (
            <FavoriteButtonText style={{ color: themeColors.buttonText }}>
              {isFavorite ? "⭐ 즐겨찾기 해제" : "☆ 즐겨찾기 추가"}
            </FavoriteButtonText>
          )}
        </FavoriteButton>
      </Container>
    </ScrollView>
  );
};
const Container = styled.View`
  flex: 1;
  padding: 20px;
  padding-top: 60px;
  background-color: #f9f9f9;
`;

const RecipeImage = styled.Image`
  width: 100%;
  height: 260px;
  border-radius: 20px;
  margin-bottom: 24px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
`;

const Category = styled.Text`
  font-size: 18px;
  text-align: center;
  color: #888;
  margin-bottom: 20px;
`;

const Description = styled.Text`
  font-size: 16px;
  text-align: center;
  color: #555;
  margin-bottom: 30px;
  line-height: 24px;
`;

const SectionContainer = styled.View`
  margin-top: 24px;
  padding-bottom: 12px;
  border-bottom-width: 1.5px;
  border-bottom-color: #ddd;
`;

const SectionTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const IngredientItem = styled.Text`
  font-size: 16px;
  margin-left: 16px;
  margin-bottom: 6px;
  color: #444;
`;

const StepItem = styled.Text`
  font-size: 16px;
  margin-left: 16px;
  margin-bottom: 12px;
  color: #444;
  line-height: 24px;
`;

const FavoriteButton = styled.TouchableOpacity`
  padding: 16px 24px;
  border-radius: 14px;
  align-items: center;
  margin-top: 40px;
  background-color: #ff7f50;
`;

const FavoriteButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

const Notice = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-decoration: underline;
`;

export default DetailRecipeScreen;
