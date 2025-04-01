import React, { useCallback, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedTheme } from "../recoil/themeState";
import { favoritesState } from "../recoil/favoritesState";

type Props = {
  navigation: any;
};

const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const theme = useRecoilValue(selectedTheme);

  useEffect(() => {
    let isMounted = true;
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (isMounted) {
          setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
        }
      } catch (error) {
        console.error("즐겨찾기 불러오기 실패:", error);
      }
    };
    loadFavorites();
    return () => {
      isMounted = false;
    };
  }, [setFavorites]);

  const removeFavorite = useCallback(
    async (id: number) => {
      try {
        const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem(
          "favorites",
          JSON.stringify(updatedFavorites)
        );
      } catch (error) {
        console.error("즐겨찾기 삭제 실패:", error);
      }
    },
    [favorites, setFavorites]
  );

  return (
    <Container style={{ backgroundColor: theme.background }}>
      <Title style={{ color: theme.text }}>⭐ 즐겨찾기</Title>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <RecipeCard style={{ backgroundColor: theme.card }}>
              <RemoveButton
                style={{ backgroundColor: theme.button }}
                onPress={() => removeFavorite(item.id)}
              >
                <RemoveButtonText style={{ color: theme.buttonText }}>
                  X
                </RemoveButtonText>
              </RemoveButton>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RecipeDetail", { recipe: item })
                }
              >
                <ImageWrapper>
                  <RecipeImage source={item.image} />
                  <Overlay>
                    <OverlayText>보기</OverlayText>
                  </Overlay>
                </ImageWrapper>
              </TouchableOpacity>
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
              </RecipeInfo>
            </RecipeCard>
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
  padding: 5px;
  padding-top: 50px;
`;

const Title = styled.Text`
  font-size: 26px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

const RecipeCard = styled.View`
  flex-direction: row;
  border-radius: 15px;
  padding: 12px;
  margin-bottom: 12px;
`;

const ImageWrapper = styled.View`
  position: relative;
`;

const RecipeImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 15px;
`;

const Overlay = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  align-items: center;
  border-radius: 0 0px 15px 15px;
`;

const OverlayText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: bold;
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

const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  right: 2%;
  margin-top: 8px;
  padding: 5px 10px;
  border-radius: 10px;
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
