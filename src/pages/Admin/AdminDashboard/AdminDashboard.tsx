/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Grid,
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
  } from "@mui/material";
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
  } from "recharts";
  import { useGetAllAgentQuery } from "../../../redux/api/agentApi";
  import { useGetAllUserQuery } from "../../../redux/api/userApi";
  import { useGetAllRechargeRequestQuery } from "../../../redux/api/adminApi";
  import { useGetAllTransactionQuery } from "../../../redux/api/transactionApi";
  import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
  import PaidIcon from "@mui/icons-material/Paid";
  import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
  import PersonIcon from "@mui/icons-material/Person";
  import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
  
  const AdminDashboard = () => {
    const { data: agents } = useGetAllAgentQuery({});
    const { data: users } = useGetAllUserQuery({});
    const { data: rechargeRequest } = useGetAllRechargeRequestQuery({});
    const { data: allTransactions = [] } = useGetAllTransactionQuery({});
  
    const approved = rechargeRequest?.filter((req: any) => req.status === "approved") || [];
    const rejected = rechargeRequest?.filter((req: any) => req.status === "rejected") || [];
  
    const transactionTypes = ["cashin", "sendmoney", "cashout", "recharge", "addmoney"];
    const transactionStats = transactionTypes.map((type) => ({
      type,
      count: allTransactions?.filter((tx: any) => tx.type === type).length || 0,
    }));
  
    const rechargeChartData = [
      { name: "Recharge Requests", Approved: approved.length, Rejected: rejected.length },
    ];
  
    const statCards = [
      { title: "Admin Total", value: 1, icon: <SupervisorAccountIcon />, color: "#4e73df" },
      { title: "Agent Total", value: agents?.length || 0, icon: <PersonIcon />, color: "#1cc88a" },
      { title: "User Total", value: users?.length || 0, icon: <PeopleAltIcon />, color: "#36b9cc" },
      { title: "Transactions", value: allTransactions?.length || 0, icon: <PaidIcon />, color: "#f6c23e" },
      {
        title: "Recharge Status",
        value: `✅ ${approved.length} / ❌ ${rejected.length}`,
        icon: <AssignmentTurnedInIcon />,
        color: "#e74a3b",
      },
    ];
  
    return (
      <Box sx={{ p: { xs: 2, md: 8 }, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
          📊 Admin Dashboard
        </Typography>
  
        <Grid container spacing={3} mt={2}>
          {statCards.map((card, idx) => (
            <Grid item xs={12} sm={6} md={2.4} key={idx}>
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: 3,
                  textAlign: "center",
                  background: `linear-gradient(to right, ${card.color}cc, ${card.color})`,
                  color: "#fff",
                  transition: "transform 0.2s",
                  ":hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <Avatar sx={{ bgcolor: "#ffffff33", mb: 1 }}>{card.icon}</Avatar>
                <Typography variant="subtitle2">{card.title}</Typography>
                <Typography variant="h5" fontWeight={700}>
                  {card.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
  
        {/* Transaction Chart */}
        <Box my={6}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            💹 Transactions by Type
          </Typography>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transactionStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1976d2" radius={[8, 8, 0, 0]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
  
        {/* Recharge Request Chart */}
        <Box my={6}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            🔋 Recharge Requests Summary
          </Typography>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rechargeChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Approved" fill="#4caf50" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Rejected" fill="#f44336" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
  
        {/* Latest 10 Transactions */}
        <Box my={6}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            🧾 Latest 10 Transactions
          </Typography>
          <Paper elevation={2} sx={{ p: 2, borderRadius: 3, overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f1f1f1" }}>
                  <TableCell><strong>Type</strong></TableCell>
                  <TableCell><strong>Sender ID</strong></TableCell>
                  <TableCell><strong>Receiver ID</strong></TableCell>
                  <TableCell><strong>Amount</strong></TableCell>
                  <TableCell><strong>Fee</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...allTransactions]
                  .slice(0, 10)
                  .map((tx: any, index: number) => (
                    <TableRow key={index} sx={{ bgcolor: index % 2 ? "#f9f9f9" : "white" }}>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell>{tx.senderId}</TableCell>
                      <TableCell>{tx.receiverId}</TableCell>
                      <TableCell>{tx.amount}</TableCell>
                      <TableCell>{tx.fee}</TableCell>
                      <TableCell>
                        {new Date(tx.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Box>
    );
  };
  
  export default AdminDashboard;
  