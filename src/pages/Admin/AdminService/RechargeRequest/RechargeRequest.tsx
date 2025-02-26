/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Typography, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useApprovedRechargeRequestMutation,
  useGetAllRechargeRequestQuery,
} from "../../../../redux/api/adminApi";
import { toast } from "sonner";

const RechargeRequest = () => {
  const { data, isLoading, isError } = useGetAllRechargeRequestQuery({});
  const [approvedRechargeRequest] = useApprovedRechargeRequestMutation();

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
    const res = await approvedRechargeRequest(request?._id);
    console.log(res);
    if (res?.data?._id) {
      toast.success("Balance Recharge request approved!");
    }
  };

  const columns: GridColDef[] = [
    { field: "agentId", headerName: "Agent ID", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => (
        <Chip
          onClick={() =>
            row.status !== "approved" && handleApprovedRechageRequest(row)
          }
          label={row.status}
          color={row.status === "approved" ? "success" : "warning"}
          sx={{
            fontWeight: "bold",
            cursor: row.status === "approved" ? "not-allowed" : "pointer",
          }}
          disabled={row.status === "approved"}
        />
      ),
    },

    { field: "createdAt", headerName: "Created At", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
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
      ) : rows.length > 0 ? (
        <Box my={2}>
          <DataGrid rows={rows} columns={columns} hideFooter autoHeight />
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
