import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import styled from "styled-components/native";
import { userService } from "../services/userService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { setAuthToken } from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await userService.login(email, password);
      const token = res.token;
      setAuthToken(token);
      navigation.replace("RecipeList");
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
      <Button title="로그인" onPress={handleLogin} />
      <Button title="회원가입" onPress={() => navigation.navigate("Signup")} />
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
