// React Native나 일부 환경에서는 setImmediate 함수가 기본적으로 제공되지 않을 수 있어서,
// 이 함수를 수동으로 추가해주는 역할을 함
export const applySetImmediatePolyfill = () => {
  // globalThis는 전역 객체(window, global 등)의 공통 표준 명칭임
  // globalThis.setImmediate가 정의되어 있지 않다면
  if (typeof globalThis.setImmediate === "undefined") {
    // setImmediate를 지원하지 않는 환경에서 setTimeout을 이용한 대체 함수 정의
    (globalThis as any).setImmediate = (
      fn: (...args: any[]) => void, // 실행할 콜백 함수
      ...args: any[] // 콜백 함수에 전달할 인자들
    ) => {
      // 0ms 후에 콜백 실행 → 거의 즉시 실행되도록 함 (이벤트 루프 다음 순서)
      return setTimeout(fn, 0, ...args);
    };
  }
};
