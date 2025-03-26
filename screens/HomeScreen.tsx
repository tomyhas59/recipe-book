import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { recipes, Recipe } from "../data/recipes"; // data에서 recipes 파일을 import

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>레시피 목록</Text>
      <FlatList
        data={recipes} // recipes 데이터를 FlatList에 전달
        keyExtractor={(item) => item.id.toString()} // id는 number형이므로 toString()을 사용하여 문자열로 변환
        renderItem={({ item }: { item: Recipe }) => (
          <View style={styles.recipeItem}>
            <Button
              title={item.name} // 레시피 이름을 버튼에 표시
              onPress={() =>
                navigation.navigate("RecipeDetails", { recipe: item })
              }
            />
          </View>
        )}
      />
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
    marginBottom: 20,
  },
  recipeItem: {
    marginBottom: 10,
  },
});

export default HomeScreen;
