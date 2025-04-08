import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components/native";

import { selectedTheme } from "../recoil/themeState";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { Alert } from "react-native";
import LoadingOverlay from "../components/LoadingOverlay";
import { loadingState } from "../recoil/loadingState";
import { doc, setDoc } from "firebase/firestore";

type Props = {
  navigation: any;
};

const SignScreen: React.FC<Props> = ({ navigation }) => {
  const [screen, setScreen] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const themeColors = useRecoilValue(selectedTheme);

  const setLoading = useSetRecoilState(loadingState);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        email: user.email,
      };

      await setDoc(doc(db, "users", user.uid), userData);

      Alert.alert("회원가입 성공!");
      navigation.navigate("Home");
    } catch (error: any) {
      console.log("회원가입 에러:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSign = (menu: "signIn" | "signUp") => {
    setConfirmPassword("");
    setEmail("");
    setPassword("");
    setScreen(menu);
  };

  return (
    <Container style={{ backgroundColor: themeColors.background }}>
      <Card style={{ backgroundColor: themeColors.card }}>
        <TabSelector style={{ backgroundColor: themeColors.background }}>
          <TabButton
            isActive={screen === "signIn"}
            onPress={() => toggleSign("signIn")}
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
            onPress={() => toggleSign("signUp")}
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
          placeholderTextColor={themeColors.placeholder}
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
          placeholderTextColor={themeColors.placeholder}
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
            placeholderTextColor={themeColors.placeholder}
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
