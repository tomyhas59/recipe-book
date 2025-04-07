import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedTheme } from "../recoil/themeState";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { favoritesState } from "../recoil/favoritesState";
import { userState } from "../recoil/userState";
import { Favorite } from "../data/user";
import {
  addToFavorites,
  removeFavoriteFromFirestore,
  getFavorites,
} from "../services/favorites";

type Props = StackScreenProps<RootStackParamList, "RecipeDetail">;

const DetailRecipeScreen: React.FC<Props> = ({ route }) => {
  const { recipe } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const themeColors = useRecoilValue(selectedTheme);
  const user = useRecoilValue(userState);

  const [favorites, setFavorites] = useRecoilState(favoritesState);

  useEffect(() => {
    const checkFavorite = async () => {
      if (user) {
        try {
          // Firestore에서 즐겨찾기 목록을 가져옵니다.
          const userFavorites = await getFavorites(user.uid);
          setFavorites(userFavorites);
          setIsFavorite(
            userFavorites.some((fav: Favorite) => fav.recipeId === recipe.id)
          );
        } catch (error) {
          console.error("즐겨찾기 확인 오류:", error);
        }
      }
    };
    checkFavorite();
  }, [recipe, user]);

  const toggleFavorite = async () => {
    if (!user) return;

    try {
      let updatedFavorites = [...favorites];

      if (isFavorite) {
        const favoriteToRemove = favorites.find(
          (fav) => fav.recipeId === recipe.id
        );

        if (favoriteToRemove?.id) {
          await removeFavoriteFromFirestore(user.uid, favoriteToRemove.id);
          updatedFavorites = updatedFavorites.filter(
            (fav) => fav.recipeId !== recipe.id
          );
        }
      } else {
        await addToFavorites(recipe, user.uid);

        updatedFavorites = [
          ...updatedFavorites,
          {
            id: "",
            userId: user.uid,
            recipeId: recipe.id,
            name: recipe.name,
            description: recipe.description,
          },
        ];
      }

      setFavorites(updatedFavorites);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("즐겨찾기 저장 오류:", error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: themeColors.background }}>
      <Container>
        <RecipeImage source={recipe.image} />
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
          {recipe.ingredients.map((item, index) => (
            <IngredientItem key={index} style={{ color: themeColors.text }}>
              - {item.name} ({item.amount})
            </IngredientItem>
          ))}
        </View>

        <SectionContainer style={{ borderBottomColor: themeColors.border }}>
          <SectionTitle style={{ color: themeColors.text }}>
            🍳 조리 방법
          </SectionTitle>
        </SectionContainer>
        <View>
          {recipe.instructions.map((item, index) => (
            <StepItem key={index} style={{ color: themeColors.text }}>
              {index + 1}. {item}
            </StepItem>
          ))}
        </View>

        <FavoriteButton
          onPress={toggleFavorite}
          style={{ backgroundColor: themeColors.button }}
        >
          <FavoriteButtonText style={{ color: themeColors.buttonText }}>
            {isFavorite ? "⭐ 즐겨찾기 해제" : "☆ 즐겨찾기 추가"}
          </FavoriteButtonText>
        </FavoriteButton>
      </Container>
    </ScrollView>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 5px;
  padding-top: 50px;
`;

const RecipeImage = styled.Image`
  width: 100%;
  height: 260px;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const Category = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-bottom: 15px;
`;

const Description = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 25px;
`;

const SectionContainer = styled.View`
  margin-top: 20px;
  padding-bottom: 8px;
  border-bottom-width: 1px;
`;

const SectionTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
`;

const IngredientItem = styled.Text`
  font-size: 16px;
  margin-left: 12px;
`;

const StepItem = styled.Text`
  font-size: 16px;
  margin-left: 12px;
  margin-bottom: 8px;
  line-height: 22px;
`;

const FavoriteButton = styled.TouchableOpacity`
  padding: 14px 20px;
  border-radius: 10px;
  align-items: center;
  margin-top: 30px;
`;

const FavoriteButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export default DetailRecipeScreen;
