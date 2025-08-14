import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import styled from "styled-components/native";
import { userService } from "../services/userService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function SignupScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
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
      <Button title="회원가입" onPress={handleSignup} />
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
