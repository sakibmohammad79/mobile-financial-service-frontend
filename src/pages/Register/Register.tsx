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
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/register", data);
      console.log("Registration Success:", response.data);
    } catch (error) {
      console.error("Registration Failed:", error);
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
              })}
              error={!!errors.pin}
              helperText={errors.pin?.message as string}
            />
            <TextField
              label="Mobile Number"
              fullWidth
              margin="normal"
              {...register("mobile", { required: "Mobile Number is required" })}
              error={!!errors.mobile}
              helperText={errors.mobile?.message as string}
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
              {...register("accountType", {
                required: "Account Type is required",
              })}
              error={!!errors.accountType}
              helperText={errors.accountType?.message as string}
            >
              <MenuItem value="Agent">Agent</MenuItem>
              <MenuItem value="User">User</MenuItem>
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
