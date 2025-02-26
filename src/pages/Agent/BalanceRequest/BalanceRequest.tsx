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
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { useSendBalanceRequestMutation } from "../../../redux/api/agentApi";
import { toast } from "sonner";
import { getuserInfo } from "../../../services/authService";

const BalanceRequest = () => {
  const userInfo = getuserInfo();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const [sendBalanceRequest, { isLoading }] = useSendBalanceRequestMutation();

  const onSubmit = async (formData: any) => {
    try {
      await sendBalanceRequest({
        agentId: userInfo?.id,
        amount: Number(formData.amount),
      });
      toast.success("Balance request sent successfully!");
      reset(); // Reset form after success
    } catch (err: any) {
      console.error(err);
      alert("Failed to send balance request.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
      }}
    >
      <Card sx={{ mt: 4, p: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={2}>
            Balance Request
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
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
              sx={{ mt: 2 }}
              startIcon={isLoading ? <CircularProgress size={20} /> : <Send />}
              disabled={isLoading}
            >
              {isLoading ? "Requesting..." : "Send Request"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BalanceRequest;
