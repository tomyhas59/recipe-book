import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRecoilValue } from "recoil";
import { selectedTheme } from "../recoil/themeState";

type NavigationProp = StackNavigationProp<RootStackParamList>;

const AddRecipeButton = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useRecoilValue(selectedTheme);

  return (
    <FloatingButton
      onPress={() => navigation.navigate("RecipeCreate")}
      activeOpacity={0.8}
      $bgColor={theme.primary}
      style={{
        backgroundColor: theme.primary,
      }}
    >
      <PlusText
        style={{
          color: theme.buttonText,
        }}
      >
        ＋
      </PlusText>
    </FloatingButton>
  );
};

export default AddRecipeButton;

const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 100px;
  right: 20px;
  border-radius: 30px;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

const PlusText = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;
