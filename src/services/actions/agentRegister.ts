import { FieldValues } from "react-hook-form";

export const agentRegister = async (formData: FieldValues) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/agent/create-agent`,
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
