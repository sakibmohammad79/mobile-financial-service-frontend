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
  Box,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getuserInfo } from "../../../../services/authService";
import { useSendBalanceRequestMutation } from "../../../../redux/api/agentApi";

const BalanceRequest = () => {
  const navigate = useNavigate();
  const userInfo = getuserInfo();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const [sendBalanceRequest, { isLoading }] = useSendBalanceRequestMutation();

  const onSubmit = async (formData: any) => {
    if (Number(formData.amount < 1000)) {
      toast.error("Minimum balance request amount is 1000 Taka.");
      return;
    }
    try {
      const res = await sendBalanceRequest({
        agentId: userInfo?.id,
        amount: Number(formData.amount),
      });
      if (res?.data?._id) {
        toast.success("Recharge request sent successfully!");
        reset();
        navigate("/agent");
      } else {
        toast.error("Recharge request send failed!");
      }
    } catch (err: any) {
      console.error(err);
      alert("Failed to send balance request.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 450,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography
              color="#1565C0"
              fontWeight={600}
              variant="h5"
              textAlign="center"
              mb={2}
            >
              Balance Request
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Send sx={{ fontSize: 42, color: "#1565c0" }} />
            </Box>

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
                sx={{
                  mt: 2,
                  bgcolor: "#1565C0",
                  "&:hover": { bgcolor: "#0036AD" },
                }}
                startIcon={
                  isLoading ? <CircularProgress size={20} /> : <Send />
                }
                disabled={isLoading}
              >
                {isLoading ? "Requesting..." : "Send Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default BalanceRequest;
