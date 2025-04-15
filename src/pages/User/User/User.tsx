import { Box } from "@mui/material";
import UserService from "../UserService.tsx/UserService";
import UserTransaction from "../UserTransaction/UserTransaction";
import UserBalance from "../BalanceSection/UserBalance";

const User = () => {
  return (
    <Box sx={{ background: "#f4f4f9" }}>
      <UserBalance />
      <UserService />
      <UserTransaction />
    </Box>
  );
};

export default User;
