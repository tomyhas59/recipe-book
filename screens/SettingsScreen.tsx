import { useRecoilState, useRecoilValue } from "recoil";
import { themeState, selectedTheme } from "../recoil/themeState";
import styled from "styled-components/native";

const SettingsScreen: React.FC = () => {
  const themeColors = useRecoilValue(selectedTheme);

  return (
    <Container style={{ backgroundColor: themeColors.background }}>
      <Title style={{ color: themeColors.text }}>💫 설정</Title>
      <SettingCardWrapper>
        <SettingCard style={{ backgroundColor: themeColors.card }}>
          <SettingText style={{ color: themeColors.text }}>
            설정 준비 중입니다...
          </SettingText>
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
