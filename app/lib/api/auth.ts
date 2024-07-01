import { LoginInput, RegisterInput } from "~/types/auth";

const apiUrl = import.meta.env.VITE_API_URL;

export const loginAccount = async ({ body }: { body: LoginInput }) => {
  try {
    const res = await fetch(apiUrl + "/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};

export const registerAccount = async ({ body }: { body: RegisterInput }) => {
  try {
    const res = await fetch(apiUrl + "/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};
