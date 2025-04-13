export const base64ToUint8Array = (base64: string) => {
  const binaryString = atob(base64); //Base64 문자열을 디코딩하여 이진 문자열로 변환
  const len = binaryString.length;
  const bytes = new Uint8Array(len); //주어진 길이를 가진 Uint8Array를 생성
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  } //각 문자의 유니코드 값을 Uint8Array에 저장
  return bytes;
};
