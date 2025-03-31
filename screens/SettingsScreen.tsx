import React from "react";
import { Switch } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeState, selectedTheme } from "../recoil/themeState";
import styled from "styled-components/native";

const SettingsScreen: React.FC = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const themeColors = useRecoilValue(selectedTheme);

  return (
    <Container style={{ backgroundColor: themeColors.background }}>
      <Title style={{ color: themeColors.text }}>설정</Title>
      <SettingCard style={{ backgroundColor: themeColors.card }}>
        <SettingText style={{ color: themeColors.text }}>
          🌙 다크모드
        </SettingText>
        <Switch
          value={theme === "dark"}
          onValueChange={() => setTheme(theme === "light" ? "dark" : "light")}
        />
      </SettingCard>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const SettingCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  padding: 15px 20px;
  border-radius: 12px;
`;

const SettingText = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;

export default SettingsScreen;
