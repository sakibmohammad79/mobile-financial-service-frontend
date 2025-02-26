/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { useSendMoneyMutation } from "../../../../redux/api/transactionApi";
import { useGetAllUserQuery } from "../../../../redux/api/userApi";
import { getuserInfo } from "../../../../services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SendMoney = () => {
  const navigate = useNavigate();
  const userInfo = getuserInfo();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      receiverPhone: "",
      amount: "",
    },
  });

  const [sendMoney, { isLoading }] = useSendMoneyMutation();
  const { data: userData, isLoading: isUserLoading } = useGetAllUserQuery({});

  const onSubmit = async (formData: any) => {
    try {
      const res = await sendMoney({
        senderId: userInfo?.id,
        receiverPhone: formData.receiverPhone,
        amount: Number(formData.amount),
      });
      console.log(res);
      if (res?.data?._id) {
        toast.success("Money sent successfully!");
        reset();
        navigate("/");
      } else {
        toast.error("Send money failed! Check your balance.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to send money.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={2}>
            Send Money
          </Typography>

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
                    {isUserLoading ? (
                      <MenuItem disabled>Loading users...</MenuItem>
                    ) : (
                      userData
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
              sx={{ mt: 2, bgcolor: "#E2136E" }}
              startIcon={isLoading ? <CircularProgress size={20} /> : <Send />}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Money"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SendMoney;
