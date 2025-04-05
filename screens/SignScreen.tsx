import React, { useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { userState } from "../recoil/userState";
import { selectedTheme } from "../recoil/themeState";

type Props = {
  navigation: any;
};

const SignScreen: React.FC<Props> = ({ navigation }) => {
  const [screen, setScreen] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const setIsLoggedIn = useSetRecoilState(userState);
  const themeColors = useRecoilValue(selectedTheme);

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    navigation.navigate("Home");
  };

  return (
    <Container style={{ backgroundColor: themeColors.background }}>
      <Card style={{ backgroundColor: themeColors.card }}>
        <TabSelector style={{ backgroundColor: themeColors.background }}>
          <TabButton
            isActive={screen === "signIn"}
            onPress={() => setScreen("signIn")}
            style={{
              backgroundColor:
                screen === "signIn" ? themeColors.primary : "transparent",
            }}
          >
            <TabText
              isActive={screen === "signIn"}
              style={{
                color:
                  screen === "signIn"
                    ? themeColors.buttonText
                    : themeColors.text,
              }}
            >
              로그인
            </TabText>
          </TabButton>
          <TabButton
            isActive={screen === "signUp"}
            onPress={() => setScreen("signUp")}
            style={{
              backgroundColor:
                screen === "signUp" ? themeColors.primary : "transparent",
            }}
          >
            <TabText
              isActive={screen === "signUp"}
              style={{
                color:
                  screen === "signUp"
                    ? themeColors.buttonText
                    : themeColors.text,
              }}
            >
              회원가입
            </TabText>
          </TabButton>
        </TabSelector>

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            backgroundColor: themeColors.background,
            color: themeColors.text,
            borderColor: themeColors.border,
          }}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            backgroundColor: themeColors.background,
            color: themeColors.text,
            borderColor: themeColors.border,
          }}
        />
        {screen === "signUp" && (
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={{
              backgroundColor: themeColors.background,
              color: themeColors.text,
              borderColor: themeColors.border,
            }}
          />
        )}

        <SubmitButton
          onPress={screen === "signIn" ? handleSignIn : handleSignUp}
          style={{ backgroundColor: themeColors.primary }}
        >
          <SubmitText style={{ color: themeColors.buttonText }}>
            {screen === "signIn" ? "로그인" : "회원가입"}
          </SubmitText>
        </SubmitButton>
      </Card>
    </Container>
  );
};

export default SignScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Card = styled.View`
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  padding: 30px 24px;
`;

const TabSelector = styled.View`
  flex-direction: row;
  border-radius: 12px;
  margin-bottom: 24px;
`;

const TabButton = styled.TouchableOpacity<{ isActive: boolean }>`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  align-items: center;
`;

const TabText = styled.Text<{ isActive: boolean }>`
  font-size: 16px;
  font-weight: bold;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 14px;
  margin-bottom: 16px;
  border-radius: 10px;
  font-size: 16px;
`;

const SubmitButton = styled.TouchableOpacity`
  padding: 14px;
  border-radius: 10px;
  align-items: center;
  margin-top: 8px;
`;

const SubmitText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
