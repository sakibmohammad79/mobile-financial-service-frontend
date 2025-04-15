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
import { MoneyOff, Payment } from "@mui/icons-material";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getuserInfo } from "../../../../services/authService";
import { useCashOutMutation } from "../../../../redux/api/transactionApi";
import { useGetAllAgentQuery } from "../../../../redux/api/agentApi";
import { useGetSingleUserQuery } from "../../../../redux/api/userApi";

const CashOut = () => {
  const navigate = useNavigate();
  const { id } = getuserInfo();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      agentId: "",
      amount: "",
      pin: "",
    },
  });
  const { data: userData } = useGetSingleUserQuery(id);
  const [cashOut, { isLoading }] = useCashOutMutation();
  const { data: agentsData, isLoading: isAgentLoading } = useGetAllAgentQuery(
    {}
  );

  // Filter verified agents
  const verifiedAgents = agentsData?.filter((agent: any) => agent.isVerified);

  const onSubmit = async (formData: any) => {
    if (Number(formData.amount < 50)) {
      toast.error("Minimum transaction amount is 50 Taka.");
      return;
    }
    if (Number(formData.amount) > userData?.balance) {
      toast.error("Insufficient balance. Please Cash-In!");
      return;
    }
    try {
      const res = await cashOut({
        userId: id,
        agentId: formData.agentId,
        amount: Number(formData.amount),
        pin: formData.pin,
      });

      if (res?.data?._id) {
        toast.success("Cash out successfully!");
        reset();
        navigate("/");
      } else {
        toast.error(res?.data?.error || "Cash out failed! Check your pin.");
      }
    } catch (err: any) {
      console.error(err);
      alert("Cash out failed!");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f9",
        padding: { xs: 2, sm: 3 },
      }}
    >
      <Card
        sx={{
          width: { xs: "90%", sm: "80%", md: "50%" },
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            color="#00CEFF"
            textAlign="center"
            mb={2}
            sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" } }}
          >
            Cash Out
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center">
            <MoneyOff sx={{ fontSize: 80, color: "#00CEFF" }} />
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Agent Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Agent</InputLabel>
              <Controller
                name="agentId"
                control={control}
                rules={{ required: "Receiver phone number is required" }}
                render={({ field }) => (
                  <Select {...field} label="Receiver Phone">
                    {isAgentLoading ? (
                      <MenuItem disabled>Loading users...</MenuItem>
                    ) : (
                      verifiedAgents?.map((agent: any) => (
                        <MenuItem key={agent._id} value={agent._id}>
                          {agent.name} ({agent.mobileNumber})
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
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Amount"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  InputLabelProps={{
                    style: { color: "#E2136E" },
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "#333",
                    },
                    "& .MuiFormHelperText-root": {
                      color: "red",
                    },
                  }}
                />
              )}
            />

            {/* Pin Field */}
            <Controller
              name="pin"
              control={control}
              rules={{ required: "Transaction PIN is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="PIN"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={!!errors.pin}
                  helperText={errors.pin?.message}
                  InputLabelProps={{
                    style: { color: "#E2136E" },
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "#333",
                    },
                    "& .MuiFormHelperText-root": {
                      color: "red",
                    },
                  }}
                />
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: "#00CEFF",
                "&:hover": {
                  bgcolor: "#00A5FF",
                },
              }}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <Payment sx={{ color: "white" }} />
                )
              }
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Cash Out"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CashOut;
