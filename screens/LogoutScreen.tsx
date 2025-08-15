import { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import { userState } from "../recoil/userState";

const LogoutScreen = () => {
  const resetUser = useResetRecoilState(userState);

  useEffect(() => {
    resetUser();
  }, []);

  return null;
};

export default LogoutScreen;
