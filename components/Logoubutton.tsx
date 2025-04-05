import React from "react";
import {
  TouchableOpacity,
  Alert,
  TouchableOpacityProps,
  GestureResponderEvent,
} from "react-native";

interface LogoutButtonProps extends TouchableOpacityProps {
  onPress: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress, ...props }) => {
  const handlePress = (event: GestureResponderEvent) => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { text: "확인", onPress },
    ]);
  };

  return (
    <TouchableOpacity
      {...(props as TouchableOpacityProps)}
      onPress={handlePress}
    />
  );
};

export default LogoutButton;
