import api from "./index";
import { User } from "../types/type";

export const userService = {
  // 유저 생성
  async create(user: User) {
    const res = await api.post("/users", user);
    return res.data as User;
  },
};
