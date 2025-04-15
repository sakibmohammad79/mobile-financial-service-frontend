/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Typography, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useApprovedRechargeRequestMutation,
  useGetAdminQuery,
  useGetAllRechargeRequestQuery,
  useRejectRechargeRequestMutation,
} from "../../../../redux/api/adminApi";
import { toast } from "sonner";
import { getuserInfo } from "../../../../services/authService";

const RechargeRequest = () => {
  const { id } = getuserInfo();
  const { data: adminData } = useGetAdminQuery(id);
  const { data, isLoading, isError } = useGetAllRechargeRequestQuery({});
  const [approvedRechargeRequest] = useApprovedRechargeRequestMutation();
  const [rejectRechargeRequest] = useRejectRechargeRequestMutation();

  if (isError) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={2}>
        Error loading recharge requests. Please try again later.
      </Typography>
    );
  }

  const rows =
    data?.map((request: any) => ({ id: request._id, ...request })) || [];

  const handleViewDetails = (id: string) => {
    console.log(`Viewing details for recharge ID: ${id}`);
  };

  const handleApprovedRechageRequest = async (request: any) => {
    if (adminData.totalSystemBalance < request.amount) {
      toast.error("Insufficent system balance.");
      return;
    }
    const res = await approvedRechargeRequest(request?._id);

    if (res?.data?._id) {
      toast.success("Balance Recharge request approved!");
    }
  };

  const handleRejectRechargeRequest = async (request: any) => {
    const res = await rejectRechargeRequest(request?._id);

    if (res?.data?._id) {
      toast.success("Balance Recharge request rejected!");
    }
  };

  const columns: GridColDef[] = [
    {
      field: "agentId",
      headerName: "Agent ID",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => {
        if (row.status === "pending") {
          return (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                variant="outlined"
                color="success"
                size="small"
                onClick={() => handleApprovedRechageRequest(row)}
                sx={{ width: "100%" }}
              >
                Approve
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleRejectRechargeRequest(row)}
                sx={{ width: "100%" }}
              >
                Reject
              </Button>
            </Box>
          );
        } else if (row.status === "approved") {
          return (
            <Chip
              label="Approved"
              color="success"
              sx={{
                fontWeight: "bold",
                cursor: "not-allowed",
              }}
              disabled
            />
          );
        } else if (row.status === "rejected") {
          return (
            <Chip
              label="Rejected"
              color="error"
              sx={{
                fontWeight: "bold",
                cursor: "not-allowed",
              }}
              disabled
            />
          );
        }
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => handleViewDetails(row.id)}
        >
          View Details
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
      ) : rows.length > 0 ? (
        <Box my={2}>
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooter
            autoHeight
            sx={{
              width: "100%",
              "& .MuiDataGrid-cell": {
                padding: "8px",
              },
              "@media (max-width: 600px)": {
                "& .MuiDataGrid-cell": {
                  padding: "4px",
                },
              },
            }}
          />
        </Box>
      ) : (
        <Typography variant="h6" textAlign="center" mt={2}>
          No recharge requests available.
        </Typography>
      )}
    </Box>
  );
};

export default RechargeRequest;
