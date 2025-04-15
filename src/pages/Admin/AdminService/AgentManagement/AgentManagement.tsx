/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Typography, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "sonner";
import {
  useAgentBlockedMutation,
  useAgentUnBlockedMutation,
  useGetAllAgentQuery,
} from "../../../../redux/api/agentApi";
import { useNavigate } from "react-router-dom";

const ManageAgent = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetAllAgentQuery({});
  const [userBlocked] = useAgentBlockedMutation();
  const [userUnBlocked] = useAgentUnBlockedMutation();

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

  const handleBlockUser = async (agent: any) => {
    try {
      if (agent.isActive) {
        const res = await userBlocked(agent._id);
        if (res?.data?._id) {
          toast.success("User blocked!");
        }
      } else {
        const res = await userUnBlocked(agent._id);
        if (res?.data?._id) {
          toast.success("User unblocked!");
        }
      }
      refetch(); // Fetch the latest data after action
    } catch (error) {
      console.log(error);
      toast.error("Action failed. Try again.");
    }
  };

  const handleViewTransactions = (agent: any) => {
    navigate(`/admin/agent-transaction/${agent._id}`);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "mobileNumber", headerName: "Phone", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "balance", headerName: "Balance", flex: 1 },
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
          }}
        >
          <Chip
            label={row.isActive ? "Active" : "Inactive"}
            color={row.isActive ? "success" : "error"}
            size="small"
            variant="filled"
          />
        </Box>
      ),
    },
    {
      field: "verify",
      headerName: "Verify",
      flex: 1,
      renderCell: ({ row }) => (
        <Box sx={{ width: "100%" }}>
          <Chip
            label={row.isVerified ? "Verified" : "Not Verified"}
            color={row.isVerified ? "primary" : "warning"}
            size="small"
            variant="filled"
          />
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
    <Box px={2} minHeight={"100vh"}>
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
          <DataGrid rows={rows} columns={columns} />
        </Box>
      ) : (
        <Typography variant="h6" textAlign="center" mt={2}>
          No agents available.
        </Typography>
      )}
    </Box>
  );
};

export default ManageAgent;
