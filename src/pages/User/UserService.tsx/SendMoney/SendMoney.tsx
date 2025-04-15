/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { Send } from "@mui/icons-material";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSendMoneyMutation } from "../../../../redux/api/transactionApi";
import {
  useGetAllUserQuery,
  useGetSingleUserQuery,
} from "../../../../redux/api/userApi";
import { getuserInfo } from "../../../../services/authService";

const SendMoney = () => {
  const navigate = useNavigate();
  const userInfo = getuserInfo();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      receiverPhone: "",
      amount: "",
    },
  });
  const { data: userData } = useGetSingleUserQuery(userInfo?.id);

  const [sendMoney, { isLoading }] = useSendMoneyMutation();
  const { data: allUserData, isLoading: isAllUserLoading } = useGetAllUserQuery(
    {}
  );

  const activeUser = allUserData?.filter((user: any) => user.isActive === true);

  const onSubmit = async (formData: any) => {
    if (Number(formData.amount) < 50) {
      toast.error("Minimum transaction amount is 50 Taka.");
      return;
    }
    if (Number(formData.amount) > userData.balance) {
      toast.error("Insufficient balance. Please Cash-In!");
      return;
    }
    try {
      const res = await sendMoney({
        senderId: userInfo?.id,
        receiverPhone: formData.receiverPhone,
        amount: Number(formData.amount),
      });

      if (res?.data?._id) {
        toast.success("Send money successfully!");
        reset();
        navigate("/user");
      } else {
        toast.error("Send money failed! Check your balance.");
      }
    } catch (err: any) {
      console.log(err);
      toast.error("Failed to send money.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f9",
      }}
    >
      <Card
        sx={{
          p: { xs: 2, sm: 3 },
          boxShadow: 3,
          borderRadius: 2,
          width: { xs: "90%", sm: "80%", md: "50%" },
        }}
      >
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={2} color="#E2136E">
            Send Money
          </Typography>

          {/* Centered Send Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Send
              sx={{
                fontSize: 60,
                color: "#E2136E",
              }}
            />
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Receiver Phone Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Receiver Phone</InputLabel>
              <Controller
                name="receiverPhone"
                control={control}
                rules={{ required: "Receiver phone number is required" }}
                render={({ field }) => (
                  <Select {...field} label="Receiver Phone">
                    {isAllUserLoading ? (
                      <MenuItem disabled>Loading users...</MenuItem>
                    ) : (
                      activeUser
                        ?.filter((user: any) => user._id !== userInfo?.id)
                        ?.map((user: any) => (
                          <MenuItem
                            key={user.mobileNumber}
                            value={user.mobileNumber}
                          >
                            {user.name} ({user.mobileNumber})
                          </MenuItem>
                        ))
                    )}
                  </Select>
                )}
              />
            </FormControl>

            {/* Amount Field */}
            <Controller
              name="amount"
              control={control}
              rules={{ required: "Amount is required", min: 1 }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Amount"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: "#E2136E", // Primary pink
                "&:hover": {
                  bgcolor: "#D11262", // Darker shade on hover
                },
              }}
              startIcon={isLoading ? <CircularProgress size={20} /> : <Send />}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Money"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SendMoney;
