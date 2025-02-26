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

const CashInService = () => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      userPhone: "",
      amount: "",
      pin: "",
    },
  });

  const [cashIn] = useCashInMutation();
  const { data, isLoading } = useGetAllUserQuery({});

  const onSubmit = async (formData: any) => {
    try {
      await cashIn(formData);
      reset(); // Reset form after success
    } catch (err: any) {
      console.error(err);
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
            Cash-In Service
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Mobile Number Dropdown */}
            <Controller
              name="userPhone"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={data || []}
                  getOptionLabel={(option: any) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.mobileNumber === value
                  }
                  onChange={(_, newValue) =>
                    field.onChange(newValue ? newValue.mobileNumber : "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select User"
                      margin="normal"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoading ? <CircularProgress size={20} /> : null}
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
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Amount"
                  type="number"
                  fullWidth
                  margin="normal"
                />
              )}
            />

            {/* Agent PIN */}
            <Controller
              name="pin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Agent PIN"
                  type="password"
                  fullWidth
                  margin="normal"
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
            >
              Confirm Cash-In
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CashInService;
