import BalanceSection from "../BalanceSection/BalanceSection";
import UserService from "../UserService/UserService";
import UserTransaction from "../UserTransaction/UserTransaction";

const Home = () => {
  return (
    <>
      <BalanceSection />
      <UserService />
      <UserTransaction />
    </>
  );
};

export default Home;
