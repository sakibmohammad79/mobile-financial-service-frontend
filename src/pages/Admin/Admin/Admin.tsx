import { Box } from "@mui/material";
import AdminBalance from "../AdminBalanceSection/AdminBalance";
import AdminService from "../AdminService/AdminService";

const Admin = () => {
  return (
    <Box minHeight={"100vh"} sx={{ background: "#f4f4f9" }}>
      <AdminBalance />
      <AdminService />
    </Box>
  );
};

export default Admin;
