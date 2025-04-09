import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { loadingState } from "../recoil/loadingState";

const LoadingOverlay = () => {
  const isLoading = useRecoilValue(loadingState);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  // 애니메이션 값을 초기값 0으로 생성하고 ref에 저장. 값이 바뀌어도 리렌더링 안 됨

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1, // 최종 값 (interpolate로 1이 360도 회전이 됨)
          duration: 1000, // 애니메이션 시간 (1초)
          easing: Easing.linear, // 속도 변화 없음 (선형)
          useNativeDriver: true, // 네이티브 드라이버 사용으로 성능 향상
        })
      ).start(); // 애니메이션 시작
    } else {
      // 로딩이 끝나면 애니메이션 정지
      rotateAnim.stopAnimation(); // 반복 루프는 stopAnimation으로는 완전 종료가 안 될 수 있음
    }
  }, [isLoading]); // isLoading 값이 바뀔 때마다 실행됨

  // 0~1의 애니메이션 값을 0deg~360deg 회전값으로 변환
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
