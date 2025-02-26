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
import { Payment } from "@mui/icons-material";
import { useCashOutMutation } from "../../../../redux/api/transactionApi";
import { useGetAllAgentQuery } from "../../../../redux/api/agentApi";
import { getuserInfo } from "../../../../services/authService";

const CashOut = () => {
  const { id } = getuserInfo();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      agentId: "",
      amount: "",
      pin: "",
    },
  });

  const [cashOut, { isLoading }] = useCashOutMutation();
  const { data: agentsData, isLoading: isAgentLoading } = useGetAllAgentQuery(
    {}
  );

  // Filter verified agents
  const verifiedAgents = agentsData?.filter((agent: any) => agent.isVerified);

  const onSubmit = async (formData: any) => {
    try {
      await cashOut({
        userId: id,
        agentId: formData.agentId,
        amount: Number(formData.amount),
        pin: formData.pin,
      });
      alert("Cash out successful!");
      reset(); // Reset form after success
    } catch (err: any) {
      console.error(err);
      alert("Cash out failed!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <Card sx={{ mt: 4, p: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={2}>
            Cash Out
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Agent Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Agent</InputLabel>
              <Controller
                name="agentId"
                control={control}
                rules={{ required: "Agent selection is required" }}
                render={({ field }) => (
                  <Select {...field} label="Select Agent">
                    {isAgentLoading ? (
                      <MenuItem disabled>Loading agents...</MenuItem>
                    ) : verifiedAgents?.length > 0 ? (
                      verifiedAgents.map((agent: any) => (
                        <MenuItem key={agent.id} value={agent.id}>
                          {agent.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No verified agents available</MenuItem>
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

            {/* Pin Field */}
            <Controller
              name="pin"
              control={control}
              rules={{ required: "Transaction PIN is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="PIN"
                  type="password"
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
              startIcon={
                isLoading ? <CircularProgress size={20} /> : <Payment />
              }
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Cash Out"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CashOut;
