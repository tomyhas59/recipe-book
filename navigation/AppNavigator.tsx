import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSetRecoilState } from "recoil";
import TabNavigator from "./TabNavigator";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";

import { userState } from "../recoil/userState";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Recipe } from "../services/recipes";
import LoadingOverlay from "../components/LoadingOverlay";

export type RootStackParamList = {
  Main: undefined;
  RecipeDetail: { recipe: Recipe };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //새로운 객체로 유저 정보 전달
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <LoadingOverlay />
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetailScreen}
          options={{ title: "레시피" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
