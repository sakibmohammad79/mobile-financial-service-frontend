import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../Layout/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import Agent from "../pages/Agent/Agent/Agent";
import CashInService from "../pages/Agent/CashInService/CashInService";
import BalanceRequest from "../pages/Agent/BalanceRequest/BalanceRequest";
import SendMoney from "../pages/Home/UserService/SendMoney/SendMoney";
import CashOut from "../pages/Home/UserService/CashOut/CashOut";
import AgentMain from "../Layout/AgentMain";
import AdminMain from "../Layout/AdminMain";
import Admin from "../pages/Admin/Admin/Admin";
import ManageUser from "../pages/Admin/AdminService/UserManagement/UserManagement";
import ManageAgent from "../pages/Admin/AdminService/AgentManagement/AgentManagement";
import RechargeRequest from "../pages/Admin/AdminService/RechargeRequest/RechargeRequest";
import AddMoneyToAgent from "../pages/Admin/AdminService/AddMoney/AddMoney";
import PrivateRoute from "./PrivateRoute";
import UserTransactions from "../pages/Admin/AdminService/UserManagement/AllUserTransaction/AllUserTransaction";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/send-money",
        element: <SendMoney />,
      },
      {
        path: "/cash-out",
        element: <CashOut />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <AgentMain />,
    children: [
      {
        path: "/agent",
        element: (
          <PrivateRoute>
            <Agent />
          </PrivateRoute>
        ),
      },
      {
        path: "/agent/cashin",
        element: <CashInService />,
      },
      {
        path: "/agent/balance-request",
        element: <BalanceRequest />,
      },
    ],
  },
  {
    path: "/",
    element: <AdminMain />,
    children: [
      {
        path: "/admin",
        element: (
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/manage-user",
        element: <ManageUser />,
      },
      {
        path: "/admin/manage-agent",
        element: <ManageAgent />,
      },
      {
        path: "/admin/recharge-request",
        element: <RechargeRequest />,
      },
      {
        path: "/admin/add-money",
        element: <AddMoneyToAgent />,
      },
      {
        path: "/admin/user-transaction/:userId",
        element: <UserTransactions />,
      },
    ],
  },
]);
