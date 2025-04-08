import React from "react";
import { RecoilRoot } from "recoil";
import AppNavigator from "./navigation/AppNavigator";
import { applySetImmediatePolyfill } from "./utils/polyfill";

applySetImmediatePolyfill();

export default function App() {
  return (
    <RecoilRoot>
      <AppNavigator />
    </RecoilRoot>
  );
}
