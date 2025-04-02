import React from "react";
import { Switch, TouchableOpacity } from "react-native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { themeState, selectedTheme } from "../recoil/themeState";
import styled from "styled-components/native";
import { userState } from "../recoil/userState";

const SettingsScreen: React.FC = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const themeColors = useRecoilValue(selectedTheme);

  const setIsLoggedIn = useSetRecoilState(userState);

  const handleLogOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <Container style={{ backgroundColor: themeColors.background }}>
      <Title style={{ color: themeColors.text }}>💫 설정</Title>
      <SettingCardWrapper>
        <SettingCard style={{ backgroundColor: themeColors.card }}>
          <SettingText style={{ color: themeColors.text }}>
            {theme === "light" ? " 🌙 다크모드" : " ☀️ 라이트모드"}
          </SettingText>
          <Switch
            value={theme === "dark"}
            onValueChange={() => setTheme(theme === "light" ? "dark" : "light")}
          />
        </SettingCard>
        <SettingCard style={{ backgroundColor: themeColors.card }}>
          <TouchableOpacity onPress={handleLogOut}>
            <SettingText style={{ color: themeColors.text }}>
              ↩️ 로그아웃
            </SettingText>
          </TouchableOpacity>
        </SettingCard>
      </SettingCardWrapper>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 5px;
  padding-top: 50px;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 28px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
`;

const SettingCardWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 90%;
`;

const SettingCard = styled.View`
  flex-direction: row;
  width: 90%;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  margin-top: 5px;
  border-radius: 12px;
`;

const SettingText = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;

export default SettingsScreen;
