import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import RecipeListScreen from "../screens/RecipeListScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import RecipeFormScreen from "../screens/RecipeFormScreen";
import CategoryScreen from "../screens/CategoryScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Recipe } from "../types/types";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import LogoutScreen from "../screens/LogoutScreen";
import { View } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Category: undefined;
  Signup: undefined;
  RecipeList: undefined;
  RecipeDetail: { recipeId: number };
  RecipeForm: { recipe?: Recipe };
  MainTabs: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecipeList" component={RecipeListScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </Stack.Navigator>
  );
}

function CategoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Category" component={CategoryScreen} />
    </Stack.Navigator>
  );
}

function FormStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecipeForm" component={RecipeFormScreen} />
    </Stack.Navigator>
  );
}

function LoginStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

const EmptyScreen = () => <View />;

const TabNavigator = () => {
  const user = useRecoilValue(userState);
  console.log(user);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "ellipse";

          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "CategoryTab") iconName = "list-outline";
          else if (route.name === "Form") iconName = "add-circle-outline";
          else if (route.name === "LoginTab") iconName = "log-in-outline";
          else if (route.name === "Logout") iconName = "log-out-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ title: "홈" }} />
      <Tab.Screen
        name="CategoryTab"
        component={CategoryStack}
        options={{ title: "카테고리" }}
      />
      {user ? (
        <Tab.Screen
          name="Form"
          component={FormStack}
          options={{
            title: "레시피 등록",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="create-outline" size={size} color={color} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Logo"
          component={EmptyScreen}
          options={{
            title: "레시피북",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book-outline" size={size} color={color} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault(); //클릭 무시
            },
          }}
        />
      )}

      {user ? (
        <Tab.Screen
          name="Logout"
          component={LogoutScreen}
          options={{ title: "로그아웃" }}
        />
      ) : (
        <Tab.Screen
          name="LoginTab"
          component={LoginStack}
          options={{ title: "로그인" }}
        />
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator;
