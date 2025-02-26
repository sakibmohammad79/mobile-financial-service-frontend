/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useCashInMutation } from "../../../redux/api/transactionApi";
import { useGetAllUserQuery } from "../../../redux/api/userApi";
import { getuserInfo } from "../../../services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

  const onSubmit = async (formData: any) => {
    console.log(formData);
    try {
      const response = await cashIn({
        userId: formData.userId,
        agentId: id,
        amount: Number(formData.amount),
        pin: formData.pin,
      });
      console.log(response);
      if (response?.data?._id) {
        toast.success("Cash-IN successfully!");
        reset();
        navigate("/agent");
      } else {
        toast.error("Cash-In failed! Check balance & PIN!");
      }
    } catch (err: any) {
      console.error(err);
      alert("An error occurred!");
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
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={2}>
            Cash-In Service
          </Typography>

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
              sx={{ mt: 2 }}
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
    </Container>
  );
};

export default CashInService;
