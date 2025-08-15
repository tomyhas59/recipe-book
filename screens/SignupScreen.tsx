import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import styled from "styled-components/native";
import { userService } from "../services/userService";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "./LoginScreen";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NavigationProp>();

  const handleSignup = async () => {
    try {
      if (!email || !password || !nickname) return;
      await userService.signup({ email, nickname, password });
      Alert.alert("회원가입 성공", "로그인 후 이용해주세요.");
      navigation.goBack();
    } catch (err) {
      Alert.alert("회원가입 실패", "다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Nickname"
        value={nickname}
        onChangeText={setNickname}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <ButtonWrapper>
        <Button title="등록" onPress={handleSignup} />
        <Button title="로그인" onPress={() => navigation.navigate("Login")} />
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
