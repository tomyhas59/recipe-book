import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RecoilRoot, useRecoilValue } from "recoil";

import HomeScreen from "./screens/HomeScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import CategoryScreen from "./screens/CategoryScreen";
import SettingsScreen from "./screens/SettingsScreen";

import { selectedTheme } from "./recoil/themeState";
import { Recipe } from "./data/recipes";
import { darkTheme } from "./styles/theme";
import SignScreen from "./screens/SignScreen";
import { userState } from "./recoil/userState";

export type RootStackParamList = {
  Main: undefined;
  RecipeDetail: { recipe: Recipe };
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

// ✅ 탭 네비게이터
const TabNavigator = () => {
  const theme = useRecoilValue(selectedTheme);
  const themeColors = theme;

  const isLoggedIn = useRecoilValue(userState);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.primary,
        tabBarStyle: {
          backgroundColor: themeColors.card,
          borderTopColor: themeColors.border,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          tabBarLabel: "카테고리",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="menu" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: "즐겨찾기",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      {isLoggedIn ? (
        <Tab.Screen
          name="Setting"
          component={SettingsScreen}
          options={{
            tabBarLabel: "설정",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cogs" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      ) : (
        <Tab.Screen
          name="Sign"
          component={SignScreen}
          options={{
            tabBarLabel: "로그인",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="login" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      )}
    </Tab.Navigator>
  );
};

// ✅ 최상위 Stack Navigator
const AppNavigator = () => {
  const theme = useRecoilValue(selectedTheme);
  const navigationTheme = theme === darkTheme ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
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

const App = () => {
  return (
    <RecoilRoot>
      <AppNavigator />
    </RecoilRoot>
  );
};

export default App;
