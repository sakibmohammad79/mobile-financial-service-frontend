import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../Layout/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AgentMain from "../Layout/Main";
import Agent from "../pages/Agent/Agent/Agent";
import CashInService from "../pages/Agent/CashInService/CashInService";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        element: <Agent />,
      },
      {
        path: "/agent/cashin",
        element: <CashInService />,
      },
    ],
  },
]);
