import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { loadingState } from "../recoil/loadingState";

const LoadingOverlay = () => {
  const isLoading = useRecoilValue(loadingState);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateAnim.stopAnimation();
    }
  }, [isLoading]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (!isLoading) return null;

  return (
    <Overlay>
      <SpinnerWrapper style={{ transform: [{ rotate: spin }] }}>
        <Spinner />
      </SpinnerWrapper>
    </Overlay>
  );
};

export default LoadingOverlay;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const SpinnerWrapper = styled(Animated.View)`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 4px solid #ffffff;
  border-top-color: #6200ee;
`;
