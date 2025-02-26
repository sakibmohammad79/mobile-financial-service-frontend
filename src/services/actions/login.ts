import { FieldValues } from "react-hook-form";

export const login = async (data: FieldValues) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
      credentials: "include",
    }
  );

  const userInfo = await res.json();

  return userInfo;
};
