/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Button, Typography, Chip, useMediaQuery } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useGetAllUserQuery,
  useUserBlockedMutation,
  useUserUnBlockedMutation,
} from "../../../../redux/api/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { data, isLoading, isError, refetch } = useGetAllUserQuery({});
  const [userBlocked] = useUserBlockedMutation();
  const [userUnBlocked] = useUserUnBlockedMutation();

  if (isError) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={2}>
        Error loading users. Please try again later.
      </Typography>
    );
  }

  const rows = data?.map((user: any) => ({ id: user._id, ...user })) || [];

  const handleBlockUser = async (user: any) => {
    try {
      if (user.isActive) {
        const res = await userBlocked(user._id);
        if (res?.data?._id) {
          toast.success("User blocked!");
        }
      } else {
        const res = await userUnBlocked(user._id);
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

  const handleViewTransactions = (user: any) => {
    navigate(`/admin/user-transaction/${user._id}`);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 140 },
    { field: "mobileNumber", headerName: "Phone", flex: 1, minWidth: 120 },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      renderCell: ({ row }) => (
        <Chip label={row.role} color="primary" variant="outlined" />
      ),
    },
    { field: "nid", headerName: "NID NO", minWidth: 120 },
    {
      field: "balance",
      headerName: "Balance",
      minWidth: 120,
      renderCell: ({ row }) => (
        <Typography>{row.balance || "0.00"} BDT</Typography>
      ),
    },
    {
      field: "isActive",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: ({ row }) => (
        <Chip
          label={row.isActive ? "Active" : "Inactive"}
          color={row.isActive ? "success" : "error"}
          sx={{ fontWeight: "bold" }}
        />
      ),
    },
    {
      field: "block",
      headerName: "Block User",
      minWidth: 120,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          color={row.isActive ? "error" : "success"}
          size="small"
          sx={{ fontWeight: "bold", textTransform: "none" }}
          onClick={() => handleBlockUser(row)}
        >
          {row.isActive ? "Block" : "Unblock"}
        </Button>
      ),
    },
    {
      field: "transactions",
      headerName: "See Transactions",
      minWidth: 140,
      renderCell: ({ row }) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          sx={{ fontWeight: "bold", textTransform: "none" }}
          onClick={() => handleViewTransactions(row)}
        >
          All Transactions
        </Button>
      ),
    },
  ];

  return (
    <Box
      px={isSmallScreen ? 1 : 3}
      py={2}
      minHeight="100vh"
      sx={{ overflowX: "auto", width: "100%" }}
    >
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
      ) : rows?.length > 0 ? (
        <Box my={2} sx={{ width: "100%", maxWidth: "100vw", overflow: "auto" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooter
            autoHeight
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              p: 1,
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f0f0f0",
              },
            }}
          />
        </Box>
      ) : (
        <Typography variant="h6" textAlign="center" mt={2}>
          No users available.
        </Typography>
      )}
    </Box>
  );
};

export default ManageUser;
