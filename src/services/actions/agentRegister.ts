import { FieldValues } from "react-hook-form";

export const agentRegister = async (formData: FieldValues) => {
  const res = await fetch(`http://localhost:5000/api/v1/agent/create-agent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    cache: "no-store",
  });
  const userInfo = await res.json();
  return userInfo;
};
