import React, { useState } from "react";
import { View, Button, Text, StyleSheet, FlatList } from "react-native";
import { Recipe, recipes } from "../data/recipes"; // 더미 데이터 불러오기

const FavoritesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  // 예시 데이터: 즐겨찾기 레시피 목록
  const [favorites, setFavorites] = useState<Recipe[]>([
    recipes[0], // 김치찌개
    recipes[1], // 불고기
  ]);

  const handleRemoveFavorite = (id: number) => {
    setFavorites(favorites.filter((recipe) => recipe.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>즐겨찾기 레시피</Text>
      {favorites.length === 0 ? (
        <Text style={styles.message}>즐겨찾기 목록이 비어있습니다.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.recipeContainer}>
              <Button
                title={item.name} // 레시피 이름을 버튼에 표시
                onPress={() =>
                  navigation.navigate("RecipeDetails", { recipe: item })
                }
              />
              <Button
                title="제거"
                onPress={() => handleRemoveFavorite(item.id)}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: "gray",
  },
  recipeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    width: "100%",
  },
  recipeName: {
    fontSize: 18,
  },
});

export default FavoritesScreen;
