import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { TouchableOpacity, View, Text } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import CategoryScreen from "./screens/CategoryScreen";
import SignScreen from "./screens/SignScreen";

import { selectedTheme, themeState } from "./recoil/themeState";
import { userState } from "./recoil/userState";

import { Recipe } from "./data/recipes";
import { darkTheme } from "./styles/theme";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

export type RootStackParamList = {
  Main: undefined;
  RecipeDetail: { recipe: Recipe };
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const TabNavigator = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const themeColors = useRecoilValue(selectedTheme);
  const [isUser, setIsUser] = useRecoilState(userState);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => setIsUser(null))
      .catch((error) => console.error("로그아웃 실패:", error));
  };

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
      <Tab.Screen
        name="darkMode"
        options={{
          tabBarLabel: theme === "light" ? " 🌙 다크모드" : " ☀️ 라이트모드",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={theme === "light" ? "weather-night" : "white-balance-sunny"}
              color={color}
              size={size}
            />
          ),
          headerShown: false,
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => setTheme(theme === "light" ? "dark" : "light")}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name={
                    theme === "light" ? "weather-night" : "white-balance-sunny"
                  }
                  color={themeColors.primary}
                  size={24}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      >
        {() => null}
      </Tab.Screen>

      {!isUser ? (
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
      ) : (
        <Tab.Screen
          name="Logout"
          options={{
            tabBarLabel: "로그아웃",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="logout" color={color} size={size} />
            ),
            headerShown: false,
            tabBarButton: () => (
              <TouchableOpacity
                onPress={handleLogOut}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="logout"
                    color={themeColors.primary}
                    size={24}
                  />
                  <Text style={{ color: themeColors.primary, fontSize: 12 }}>
                    로그아웃
                  </Text>
                </View>
              </TouchableOpacity>
            ),
          }}
        >
          {() => null}
        </Tab.Screen>
      )}
    </Tab.Navigator>
  );
};

// ✅ 최상위 Stack Navigator
const AppNavigator = () => {
  const theme = useRecoilValue(selectedTheme);
  const navigationTheme = theme === darkTheme ? DarkTheme : DefaultTheme;
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //새로운 객체로 전달
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
  // TypeScript에서 setImmediate 폴리필을 안전하게 추가
  if (typeof globalThis.setImmediate === "undefined") {
    (globalThis as any).setImmediate = (
      fn: (...args: any[]) => void,
      ...args: any[]
    ) => {
      return setTimeout(fn, 0, ...args);
    };
  }

  return (
    <RecoilRoot>
      <AppNavigator />
    </RecoilRoot>
  );
};

export default App;
