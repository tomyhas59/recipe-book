import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { recipes, Recipe } from "../data/recipes";

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const scrollViewRef = useRef<ScrollView | null>(null);

  // 카테고리에 따른 레시피 필터링
  const filteredRecipes =
    selectedCategory === "전체"
      ? recipes
      : recipes.filter((recipe) => recipe.category === selectedCategory);

  // 카테고리 리스트
  const categories = ["전체", "한식", "중식", "양식", "일식"];

  // 카테고리 스크롤 이동 함수
  const scrollToCategory = (direction: "left" | "right") => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: direction === "right" ? 500 : -500, // 왼쪽 또는 오른쪽으로 스크롤
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>레시피 목록</Text>

      {/* 카테고리 버튼들 */}
      <View style={styles.navbarContainer}>
        <TouchableOpacity
          style={[styles.scrollButton, { left: 10 }]}
          onPress={() => scrollToCategory("left")}
        >
          <Text style={styles.scrollButtonText}>{"<"}</Text>
        </TouchableOpacity>

        <ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navbar}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.navButton,
                selectedCategory === category && styles.selectedNavButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.navButtonText,
                  selectedCategory === category && styles.selectedNavButtonText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[styles.scrollButton, { right: 10 }]}
          onPress={() => scrollToCategory("right")}
        >
          <Text style={styles.scrollButtonText}>{">"}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.recipeList}
        renderItem={({ item }: { item: Recipe }) => (
          <View style={styles.recipeItem}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.recipeImage}
            />
            <Text style={styles.recipeName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.recipeButton}
              onPress={() =>
                navigation.navigate("RecipeDetails", { recipe: item })
              }
            >
              <Text style={styles.recipeButtonText}>자세히 보기</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    paddingHorizontal: 16,
    textAlign: "center",
  },
  navbarContainer: {
    flexDirection: "row",
    width: 400,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: 10,
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginHorizontal: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#008CBA",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedNavButton: {
    backgroundColor: "#008CBA",
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#008CBA",
  },
  selectedNavButtonText: {
    color: "#fff",
  },
  recipeList: {
    paddingHorizontal: 8,
  },
  recipeItem: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.8)",
    elevation: 5, // Android에서 그림자 효과
    overflow: "hidden",
  },
  recipeImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  recipeButton: {
    backgroundColor: "#008CBA",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  recipeButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  scrollButton: {
    backgroundColor: "#fff",
    padding: 12,
    zIndex: 999,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#008CBA",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008CBA",
  },
});

export default HomeScreen;
