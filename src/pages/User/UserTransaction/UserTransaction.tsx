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
  Container,
} from "@mui/material";
import moment from "moment";
import { useGetUserTransactionQuery } from "../../../redux/api/transactionApi";
import { useEffect, useState } from "react";
import { getuserInfo } from "../../../services/authService";

const UserTransaction = () => {
  const [userId, setUserId] = useState("");
  const [visibleCount, setVisibleCount] = useState(10); // Initially show 5 transactions

  useEffect(() => {
    const userInfo = getuserInfo();
    if (userInfo) {
      setUserId(userInfo?.id);
    }
  }, []);

  const { data: transactions, isLoading } = useGetUserTransactionQuery(userId);

  // Handle loading state
  if (isLoading) {
    return (
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", mt: 3 }}
      >
        <CircularProgress sx={{ color: "#E2136E" }} />
      </Grid>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box pb={8}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography
                textAlign={"center"}
                variant="h6"
                fontWeight="bold"
                my={2}
                color="#E2136E"
              >
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
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Amount (Taka)
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Fee</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Transaction ID
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Transaction Date
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
                            <TableCell>
                              {moment(tx?.createdAt).format(
                                "MMM D, YYYY h:mm A"
                              )}
                            </TableCell>
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
                  sx={{
                    mt: 2,
                    display: "block",
                    mx: "auto",
                    borderRadius: 2,
                    bgcolor: "#E2136E",
                    "&:hover": {
                      backgroundColor: "#C51162",
                    },
                  }}
                  onClick={() => setVisibleCount((prev) => prev + 5)}
                >
                  See More
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserTransaction;
