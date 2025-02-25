/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { userRegister } from "../../services/actions/userRegister";
import { agentRegister } from "../../services/actions/agentRegister";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const userRegisterData = { user: data };
    const agentRegisterData = { agent: data };
    console.log(agentRegisterData);
    try {
      let res;
      if (data.role === "user") {
        res = await userRegister(userRegisterData);
      } else if (data.role === "agent") {
        res = await agentRegister(agentRegisterData);
      }

      if (res?.data?._id) {
        toast.success(res?.message || "Registration successful!");
        reset();
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration Failed:", error);
      toast.error("Registration failed. Please try again.");
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
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message as string}
            />
            <TextField
              label="5 Digit PIN"
              type="password"
              fullWidth
              margin="normal"
              {...register("pin", {
                required: "PIN is required",
                minLength: { value: 5, message: "PIN must be 5 digits" },
                maxLength: { value: 5, message: "PIN must be 5 digits" },
              })}
              error={!!errors.pin}
              helperText={errors.pin?.message as string}
            />
            <TextField
              label="Mobile Number"
              fullWidth
              margin="normal"
              {...register("mobileNumber", {
                required: "Mobile Number is required",
                pattern: {
                  value: /^\d{11}$/,
                  message: "Mobile number must be exactly 11 digits",
                },
              })}
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber?.message as string}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message as string}
            />
            <TextField
              select
              label="Account Type"
              fullWidth
              margin="normal"
              {...register("role", {
                required: "Account Type is required",
              })}
              error={!!errors.role}
              helperText={errors.role?.message as string}
            >
              <MenuItem value="agent">Agent</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </TextField>
            <TextField
              label="NID"
              fullWidth
              margin="normal"
              {...register("nid", { required: "NID is required" })}
              error={!!errors.nid}
              helperText={errors.nid?.message as string}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
