import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const RecipeDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>재료</Text>
        <FlatList
          data={recipe.ingredients}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.ingredientRow}>
              <Text style={styles.ingredientName}>{item.name}</Text>
              <Text style={styles.ingredientAmount}>{item.amount}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>조리법</Text>
        <FlatList
          data={recipe.instructions}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Text style={styles.instructions}>
              {index + 1}. {item}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8", // 배경색 추가
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.8)",
    elevation: 3, // 안드로이드 그림자
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#444",
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  ingredientName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ingredientAmount: {
    fontSize: 18,
    color: "#666",
  },
  instructions: {
    marginBottom: 12,
    fontSize: 16,
  },
});

export default RecipeDetailScreen;
