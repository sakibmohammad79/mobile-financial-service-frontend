import AgentBalanceSection from "../AgentBalanceSection/AgentBalanceSection";
import AgenService from "../AgentService/AgentService";
import AgentTransaction from "../AgentTransaction/AgentTransaction";

const Agent = () => {
  return (
    <>
      <AgentBalanceSection />
      <AgenService />
      <AgentTransaction />
    </>
  );
};

export default Agent;
