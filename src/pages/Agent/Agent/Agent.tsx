import { Box } from "@mui/material";
import AgentBalanceSection from "../AgentBalanceSection/AgentBalanceSection";
import AgenService from "../AgentService/AgentService";
import AgentTransaction from "../AgentTransaction/AgentTransaction";

const Agent = () => {
  return (
    <Box sx={{ background: "#f4f4f9" }}>
      <AgentBalanceSection />
      <AgenService />
      <AgentTransaction />
    </Box>
  );
};

export default Agent;
