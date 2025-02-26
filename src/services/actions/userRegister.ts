import { FieldValues } from "react-hook-form";

export const userRegister = async (formData: FieldValues) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/user/create-user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    }
  );
  const userInfo = await res.json();
  return userInfo;
};
