/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Container, TextField, Typography } from "@mui/material";

import { useForm } from "react-hook-form";
import { login } from "../../services/actions/login";
import { storeUserInfo } from "../../services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const res = await login(data);
      if (res?.data?.user?._id) {
        storeUserInfo(res?.data?.token);
        toast.success(res?.message);
        reset();
        navigate("/");
      }
      console.log(res);
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <TextField
              label="Mobile Number / Email"
              fullWidth
              margin="normal"
              {...register("identifier", {
                required: "Mobile Number or Email is required",
              })}
              error={!!errors.identifier}
              helperText={errors.identifier?.message as string}
            />
            <TextField
              label="PIN"
              type="password"
              fullWidth
              margin="normal"
              {...register("pin", { required: "PIN is required" })}
              error={!!errors.pin}
              helperText={errors.pin?.message as string}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
