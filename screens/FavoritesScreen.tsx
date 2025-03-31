import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Recipe } from "../data/recipes";
import { useRecoilValue } from "recoil";
import { selectedTheme } from "../recoil/themeState";

type Props = {
  navigation: any;
};

const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const theme = useRecoilValue(selectedTheme);

  // ✅ 로컬 저장소에서 즐겨찾기 데이터 불러오기
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("즐겨찾기 불러오기 실패:", error);
      }
    };
    loadFavorites();
  }, []);

  // ✅ 즐겨찾기 삭제
  const removeFavorite = async (id: number) => {
    try {
      const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("즐겨찾기 삭제 실패:", error);
    }
  };

  return (
    <Container style={{ backgroundColor: theme.background }}>
      <Title style={{ color: theme.text }}>⭐ 즐겨찾기</Title>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RecipeDetail", { recipe: item })
              }
            >
              <RecipeCard style={{ backgroundColor: theme.card }}>
                <RecipeImage source={item.image} />
                <RecipeInfo>
                  <RecipeName style={{ color: theme.text }}>
                    {item.name}
                  </RecipeName>
                  <RecipeDescription
                    style={{ color: theme.text }}
                    numberOfLines={2}
                  >
                    {item.description}
                  </RecipeDescription>
                  <RemoveButton
                    style={{ backgroundColor: theme.button }}
                    onPress={() => removeFavorite(item.id)}
                  >
                    <RemoveButtonText style={{ color: theme.buttonText }}>
                      삭제
                    </RemoveButtonText>
                  </RemoveButton>
                </RecipeInfo>
              </RecipeCard>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <NoFavorites style={{ color: theme.text }}>
          즐겨찾기한 레시피가 없습니다.
        </NoFavorites>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const RecipeCard = styled.View`
  flex-direction: row;
  border-radius: 15px;
  padding: 12px;
  margin-bottom: 12px;
`;

const RecipeImage = styled(Image)`
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
`;

const RemoveButton = styled(TouchableOpacity)`
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  align-self: flex-start;
`;

const RemoveButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

const NoFavorites = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-top: 50px;
`;

export default FavoritesScreen;
