import React, { useState } from "react";
import { Button, Alert } from "react-native";
import styled from "styled-components/native";
import { userService } from "../services/userService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { setAuthToken } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import { RootTabParamList } from "../navigation/TabNavigator";

// 네비게이션 타입
export type NavigationProp = NativeStackNavigationProp<RootTabParamList>;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NavigationProp>();
  const setUser = useSetRecoilState(userState);

  const handleLogin = async () => {
    try {
      if (!email || !password) return;
      const res = await userService.login(email, password);
      const token = res.token;
      setAuthToken(token);
      navigation.navigate("HomeTab", {
        screen: "RecipeList",
      });
      setUser(res);
    } catch (err) {
      Alert.alert("로그인 실패", "이메일 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <Container>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <ButtonWrapper>
        <Button title="로그인" onPress={handleLogin} />
        <Button
          title="회원가입"
          onPress={() => navigation.navigate("LoginTab", { screen: "Signup" })}
        />
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
`;

const ButtonWrapper = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 5px;
`;
