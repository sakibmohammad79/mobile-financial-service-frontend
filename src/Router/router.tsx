import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Agent from "../pages/Agent/Agent/Agent";
import AgentMain from "../Layout/AgentMain";
import AdminMain from "../Layout/AdminMain";
import Admin from "../pages/Admin/Admin/Admin";
import ManageUser from "../pages/Admin/AdminService/UserManagement/UserManagement";
import ManageAgent from "../pages/Admin/AdminService/AgentManagement/AgentManagement";
import RechargeRequest from "../pages/Admin/AdminService/RechargeRequest/RechargeRequest";
import AddMoneyToAgent from "../pages/Admin/AdminService/AddMoney/AddMoney";
import PrivateRoute from "./PrivateRoute";
import UserTransactions from "../pages/Admin/AdminService/UserManagement/AllUserTransaction/AllUserTransaction";
import AllAgentTransaction from "../pages/Admin/AdminService/AgentManagement/AllAgentTransaction/AllAgentTransaction";
import CashInService from "../pages/Agent/AgentService/CashInService/CashInService";
import BalanceRequest from "../pages/Agent/AgentService/BalanceRequest/BalanceRequest";
import Main from "../Layout/Main";
import UserMain from "../Layout/UserMain";
import User from "../pages/User/User/User";
import SendMoney from "../pages/User/UserService.tsx/SendMoney/SendMoney";
import CashOut from "../pages/User/UserService.tsx/CashOut/CashOut";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoutes";
import AgentRoute from "./AgentRoute";
import NotFound from "../pages/NotFound/NotFound";
import About from "../pages/About/About";
import Blog from "../pages/Blog/Blog";
import AuthLayout from "../Layout/AuthLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
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
        path: "/about",
        element: (
          <PrivateRoute>
            <About />
          </PrivateRoute>
        ),
      },
      {
        path: "/blog",
        element: (
          <PrivateRoute>
            <Blog />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
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
    element: (
      <PrivateRoute>
        <UserMain />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/user",
        element: (
          <PrivateRoute>
            <UserRoute>
              <User />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "user/send-money",
        element: (
          <PrivateRoute>
            <UserRoute>
              <SendMoney />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "user/cash-out",
        element: (
          <PrivateRoute>
            <UserRoute>
              <CashOut />
            </UserRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <AgentMain />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/agent",
        element: (
          <PrivateRoute>
            <AgentRoute>
              <Agent />
            </AgentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/agent/cashin",
        element: (
          <PrivateRoute>
            <AgentRoute>
              <CashInService />
            </AgentRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/agent/balance-request",
        element: (
          <PrivateRoute>
            <AgentRoute>
              <BalanceRequest />
            </AgentRoute>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/",
    element: (
      <PrivateRoute>
        <AdminMain />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <PrivateRoute>
            <AdminRoute>
             <AdminDashboard/>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Admin />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/manage-user",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUser />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/manage-agent",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageAgent />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/recharge-request",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <RechargeRequest />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/add-money",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddMoneyToAgent />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/user-transaction/:userId",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UserTransactions />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/agent-transaction/:agentId",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllAgentTransaction />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
