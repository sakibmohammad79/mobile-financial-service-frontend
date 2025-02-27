/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetUserTransactionQuery } from "../../../../../redux/api/transactionApi";

const UserTransactions = () => {
  const { userId } = useParams();
  const { data, isLoading, isError } = useGetUserTransactionQuery(userId);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={2}>
        Failed to load transactions. Try again later.
      </Typography>
    );
  }

  const rows =
    data?.map((transaction: any) => ({
      id: transaction._id,
      ...transaction,
    })) || [];
  console.log(rows);
  const columns: GridColDef[] = [
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "type", headerName: "Transaction Type", flex: 1 },
    { field: "fee", headerName: "Fee", flex: 1 },
    { field: "_id", headerName: "Transaction ID", flex: 1 },
    { field: "createdAt", headerName: "Date", flex: 1 },
  ];

  return (
    <Box px={2} my={3} minHeight={"100vh"}>
      <Typography variant="h5" textAlign="center" mb={2}>
        User Transactions
      </Typography>
      <DataGrid rows={rows || []} columns={columns} />
    </Box>
  );
};

export default UserTransactions;
