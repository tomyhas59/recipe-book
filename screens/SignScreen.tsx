import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components/native";
import { userState } from "../recoil/userState";

const SignScreen: React.FC = () => {
  const [screen, setScreen] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const setIsLoggedIn = useSetRecoilState(userState);
  const handleSignIn = () => {
    setIsLoggedIn(true);
    console.log("Signing In with:", email, password);
  };

  const handleSignUp = () => {
    console.log("Signing Up with:", email, password, confirmPassword);
  };

  return (
    <Container>
      <ButtonContainer>
        <TabButton
          selected={screen === "signIn"}
          onPress={() => setScreen("signIn")}
        >
          <TabText selected={screen === "signIn"}>로그인</TabText>
        </TabButton>
        <TabButton
          selected={screen === "signUp"}
          onPress={() => setScreen("signUp")}
        >
          <TabText selected={screen === "signUp"}>회원가입</TabText>
        </TabButton>
      </ButtonContainer>

      {screen === "signIn" ? (
        <>
          <Title>로그인</Title>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button onPress={handleSignIn}>
            <ButtonText>확인</ButtonText>
          </Button>
        </>
      ) : (
        <>
          <Title>회원가입</Title>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <Button onPress={handleSignUp}>
            <ButtonText>확인</ButtonText>
          </Button>
        </>
      )}
    </Container>
  );
};

export default SignScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const TabButton = styled.TouchableOpacity<{ selected: boolean }>`
  flex: 1;
  padding: 10px;
  align-items: center;
  background-color: ${({ selected }: { selected: boolean }) =>
    selected ? "#007bff" : "#ccc"};
  border-radius: 5px;
  margin: 0 5px;
`;

const TabText = styled.Text<{ selected: boolean }>`
  color: ${({ selected }: { selected: boolean }) =>
    selected ? "white" : "black"};
  font-size: 16px;
  font-weight: bold;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
`;

const Button = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  align-items: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;
