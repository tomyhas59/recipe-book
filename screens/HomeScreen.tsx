import React from "react";
import { FlatList, TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";
import { Recipe, recipes } from "../data/recipes";
import { useRecoilValue } from "recoil";
import { selectedTheme } from "../recoil/themeState";

type Props = {
  navigation: any;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const themeColors = useRecoilValue(selectedTheme);

  const renderItem = ({ item }: { item: Recipe }) => (
    <Card
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
      style={{
        backgroundColor: themeColors.card,
        borderColor: themeColors.border,
      }}
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
      <Title style={{ color: themeColors.text }}>🍽 추천 레시피</Title>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Card = styled(TouchableOpacity)`
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 15px;
  flex-direction: row;
  border-width: 1px;
`;

const RecipeImage = styled(Image)`
  width: 100px;
  height: 100px;
`;

const CardContent = styled.View`
  flex: 1;
  padding: 10px;
  justify-content: center;
`;

const RecipeName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Description = styled.Text`
  font-size: 14px;
  margin-top: 5px;
`;

export default HomeScreen;
