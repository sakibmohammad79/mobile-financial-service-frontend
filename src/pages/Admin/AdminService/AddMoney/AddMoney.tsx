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

import { getuserInfo } from "../../../../services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useGetAllAgentQuery } from "../../../../redux/api/agentApi";
import { useAddMoneyMutation } from "../../../../redux/api/transactionApi";

const AddMoneyToAgent = () => {
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

  const [cashOut, { isLoading }] = useAddMoneyMutation();
  const { data: agentsData, isLoading: isAgentLoading } = useGetAllAgentQuery(
    {}
  );

  // Filter verified agents
  const verifiedAgents = agentsData?.filter((agent: any) => agent.isVerified);

  const onSubmit = async (formData: any) => {
    try {
      const res = await cashOut({
        agentId: formData.agentId,
        adminId: id,
        amount: Number(formData.amount),
      });

      if (res?.data?._id) {
        toast.success("Add money to agent successfully!");
        reset();
        navigate("/admin");
      } else {
        toast.error("Add money failed! check balance!");
      }
    } catch (err: any) {
      console.error(err);
      alert("Cash out failed!");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "100%", p: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={2}>
            add money
          </Typography>

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
              {isLoading ? "Processing..." : "Add Money"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddMoneyToAgent;
