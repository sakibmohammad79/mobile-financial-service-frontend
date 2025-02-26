/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "sonner";
import {
  useAgentBlockedMutation,
  useGetAllAgentQuery,
} from "../../../../redux/api/agentApi";

// const allowedStatuses = ["ACTIVE", "BLOCKED", "DELETED"];

const ManageAgent = () => {
  const { data, isLoading, isError } = useGetAllAgentQuery({});
  const [userBlocked] = useAgentBlockedMutation();

  if (data?.length < 0) {
    return (
      <Typography variant="h6" textAlign="center" mt={2}>
        No user available.
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={2}>
        Error loading donors. Please try again later.
      </Typography>
    );
  }

  const rows = data?.map((user: any) => ({ id: user._id, ...user })) || [];

  const handleBlockUser = async (user: any) => {
    const res = await userBlocked(user?._id);
    if (res?.data?._id) {
      toast.success("User blocked!");
    }
  };

  const handleViewTransactions = (user: any) => {
    console.log(`Viewing transactions for user ID: ${user._id}`);
    // Navigate to transactions page or open a modal
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "mobileNumber", headerName: "Phone", flex: 1 },
    { field: "role", headerName: "Role" },
    { field: "nid", headerName: "NID NO", width: 150 },
    {
      field: "isActive",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            color: row.isActive ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          <Typography>{row.isActive ? "Active" : "Inactive"}</Typography>
        </Box>
      ),
    },
    {
      field: "block",
      headerName: "Block User",
      width: 150,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          color={row.isActive ? "error" : "success"}
          size="small"
          onClick={() => handleBlockUser(row)}
        >
          {row.isActive ? "Block" : "Unblock"}
        </Button>
      ),
    },
    {
      field: "transactions",
      headerName: "See Transactions",
      width: 180,
      renderCell: ({ row }) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => handleViewTransactions(row)}
        >
          All Transactions
        </Button>
      ),
    },
  ];
  return (
    <Box px={2}>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography variant="h6" color="error" textAlign="center" mt={2}>
          Error loading donors. Please try again later.
        </Typography>
      ) : rows?.length > 0 ? (
        <Box my={2} justifyContent="center" alignItems="center">
          <DataGrid rows={rows} columns={columns} hideFooter />
        </Box>
      ) : (
        <Typography variant="h6" textAlign="center" mt={2}>
          No donors available.
        </Typography>
      )}
    </Box>
  );
};

export default ManageAgent;
