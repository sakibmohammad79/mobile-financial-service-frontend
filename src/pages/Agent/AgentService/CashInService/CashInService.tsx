/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Autocomplete,
  CircularProgress,
  Box,
} from "@mui/material";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getuserInfo } from "../../../../services/authService";
import { useCashInMutation } from "../../../../redux/api/transactionApi";
import { useGetAllUserQuery } from "../../../../redux/api/userApi";
import { useGetSingleAgentQuery } from "../../../../redux/api/agentApi";
import { AccountBalanceWallet } from "@mui/icons-material";

const CashInService = () => {
  const navigate = useNavigate();
  const { id } = getuserInfo();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userId: "",
      amount: "",
      pin: "",
    },
  });

  const [cashIn, { isLoading: isSubmitting }] = useCashInMutation();
  const { data: usersData, isLoading: isUserLoading } = useGetAllUserQuery({});
  const { data: agentData } = useGetSingleAgentQuery(id);

  const onSubmit = async (formData: any) => {
    if (Number(formData.amount) < 50) {
      toast.error("Minimum transaction amount is 50 Taka.");
      return;
    }
    if (agentData.balance < Number(formData.amount)) {
      toast.error("Insufficient balance. Please recharge first!");
      return;
    }
    try {
      const response = await cashIn({
        userId: formData.userId,
        agentId: id,
        amount: Number(formData.amount),
        pin: formData.pin,
      });

      if (response?.data?._id) {
        toast.success("Cash-IN successfully!");
        reset();
        navigate("/agent");
      } else {
        toast.error("Cash-In failed! Check your PIN!");
      }
    } catch (err: any) {
      console.error(err);
      alert("An error occurred!");
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
          width: { xs: "90%", sm: "80%", md: "40%" },

          p: { xs: 2, sm: 3 },
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography
            color="#43A047"
            fontWeight={600}
            variant="h5"
            textAlign="center"
            mb={2}
          >
            Cash-In Service
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 80,
            }}
          >
            <AccountBalanceWallet sx={{ fontSize: 42, color: "#43a047" }} />
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Mobile Number Dropdown */}
            <Controller
              name="userId"
              control={control}
              rules={{ required: "User selection is required" }}
              render={({ field }) => (
                <Autocomplete
                  options={usersData || []}
                  getOptionLabel={(option: any) =>
                    `${option.name} (${option.mobileNumber})`
                  }
                  isOptionEqualToValue={(option, value) => option._id === value}
                  onChange={(_, newValue) =>
                    field.onChange(newValue ? newValue._id : "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select User"
                      margin="normal"
                      fullWidth
                      error={!!errors.userId}
                      helperText={errors.userId?.message}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isUserLoading ? (
                              <CircularProgress size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              )}
            />

            {/* Amount */}
            <Controller
              name="amount"
              control={control}
              rules={{
                required: "Amount is required",
                min: { value: 1, message: "Amount must be greater than 0" },
              }}
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

            {/* Agent PIN */}
            <Controller
              name="pin"
              control={control}
              rules={{ required: "PIN is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Agent PIN"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={!!errors.pin}
                  helperText={errors.pin?.message}
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
                bgcolor: "#43A047",
                "&:hover": { bgcolor: "#007C00" },
                fontSize: { xs: "0.9rem", sm: "1rem" },
                py: 1.5, // Adjusting padding for touch-friendly buttons
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={20} />
              ) : (
                "Confirm Cash-In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CashInService;
