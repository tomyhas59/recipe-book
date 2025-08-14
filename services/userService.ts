import { api } from "./api";
import { User } from "../types/types";

export const userService = {
  signup: async (user: User) => {
    const res = await api.post("/signup", user);
    return res.data;
  },
  login: async (email: string, password: string) => {
    const res = await api.post("/login", { email, password });
    return res.data;
  },
};
