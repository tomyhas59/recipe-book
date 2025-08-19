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
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/userState";
import LogoutScreen from "../screens/LogoutScreen";
import { View } from "react-native";
import { CommonActions, NavigatorScreenParams } from "@react-navigation/native";
import FavoritesScreen from "../screens/FavoritesScreen";

export type LoginStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type HomeStackParamList = {
  RecipeList: undefined;
  RecipeDetail: { recipeId: number };
};

export type CategoryStackParamList = {
  Category: undefined;
};
export type FavoritesStackParamList = {
  Favorites: undefined;
};

export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  CategoryTab: NavigatorScreenParams<CategoryStackParamList>;
  FormTab: undefined;
  LoginTab: NavigatorScreenParams<LoginStackParamList>;
  LogoutTab: undefined;
};

const Tab = createBottomTabNavigator();
const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();
const CategoryStackNav = createNativeStackNavigator<CategoryStackParamList>();
const FavoritesStackNav = createNativeStackNavigator<FavoritesStackParamList>();
const LoginStackNav = createNativeStackNavigator<LoginStackParamList>();
const FormStackNav = createNativeStackNavigator();

function HomeStack() {
  return (
    <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNav.Screen name="RecipeList" component={RecipeListScreen} />
      <HomeStackNav.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </HomeStackNav.Navigator>
  );
}

function CategoryStack() {
  return (
    <CategoryStackNav.Navigator screenOptions={{ headerShown: false }}>
      <CategoryStackNav.Screen name="Category" component={CategoryScreen} />
    </CategoryStackNav.Navigator>
  );
}

function FormStack() {
  return (
    <FormStackNav.Navigator screenOptions={{ headerShown: false }}>
      <FormStackNav.Screen name="RecipeForm" component={RecipeFormScreen} />
    </FormStackNav.Navigator>
  );
}

function FavoritesStack() {
  return (
    <FavoritesStackNav.Navigator screenOptions={{ headerShown: false }}>
      <FavoritesStackNav.Screen name="Favorites" component={FavoritesScreen} />
    </FavoritesStackNav.Navigator>
  );
}

function LoginStack() {
  return (
    <LoginStackNav.Navigator screenOptions={{ headerShown: false }}>
      <LoginStackNav.Screen name="Login" component={LoginScreen} />
      <LoginStackNav.Screen name="Signup" component={SignupScreen} />
    </LoginStackNav.Navigator>
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

          if (route.name === "HomeTab") iconName = "home-outline";
          else if (route.name === "CategoryTab") iconName = "list-outline";
          else if (route.name === "FormTab") iconName = "add-circle-outline";
          else if (route.name === "LoginTab") iconName = "log-in-outline";
          else if (route.name === "LogoutTab") iconName = "log-out-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "홈" }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.navigate({
                name: "HomeTab",
                params: { screen: "RecipeList" },
              })
            );
          },
        })}
      />
      <Tab.Screen
        name="CategoryTab"
        component={CategoryStack}
        options={{ title: "카테고리" }}
      />
      {user ? (
        <>
          <Tab.Screen
            name="FormTab"
            component={FormStack}
            options={{
              title: "레시피 등록",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="create-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="FavoriteTab"
            component={FavoritesStack}
            options={{
              title: "즐겨찾기",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="star-outline" size={size} color={color} />
              ),
            }}
          />
        </>
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
          name="LogoutTab"
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
