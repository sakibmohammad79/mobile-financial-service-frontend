/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import { useGetAgentTransactionQuery } from "../../../redux/api/transactionApi";
import { useEffect, useState } from "react";
import { getuserInfo } from "../../../services/authService";

const AgentTransaction = () => {
  const [userId, setUserId] = useState("");
  const [visibleCount, setVisibleCount] = useState(5); // Initially show 5 transactions

  useEffect(() => {
    const userInfo = getuserInfo();
    if (userInfo) {
      setUserId(userInfo?.id);
    }
  }, []);

  const { data: transactions, isLoading } = useGetAgentTransactionQuery(userId);

  // Handle loading state
  if (isLoading) {
    return (
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", mt: 3 }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Box mb={12}>
      <Grid item xs={12}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Recent Transactions
            </Typography>

            {/* Handle No Transactions */}
            {!transactions || transactions.length === 0 ? (
              <Typography textAlign="center" color="text.secondary">
                No transactions found.
              </Typography>
            ) : (
              <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Amount (Taka)
                      </TableCell>

                      <TableCell sx={{ fontWeight: "bold" }}>Fee</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Transaction ID
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions
                      .slice(0, visibleCount)
                      .map((tx: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{tx?.type}</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            {tx?.amount}
                          </TableCell>
                          <TableCell>{tx?.fee}</TableCell>
                          <TableCell>{tx?._id}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* Show More Button */}
            {transactions && transactions.length > visibleCount && (
              <Button
                variant="contained"
                sx={{ mt: 2, display: "block", mx: "auto", borderRadius: 2 }}
                onClick={() => setVisibleCount((prev) => prev + 5)}
              >
                See More
              </Button>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

export default AgentTransaction;
