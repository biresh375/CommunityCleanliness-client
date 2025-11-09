import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Components/Home/Home";
import Login from "../Components/Register/Login";
import Register from "../Components/Register/Register";
import AllIssue from "../pages/AllIssue";
import AddIssues from "../pages/AddIssues";
import MyIssues from "../pages/MyIssues";
import MyContribution from "../pages/MyContribution";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/all-issues",
        element: <AllIssue></AllIssue>,
      },
      {
        path: "/add-issue",
        element: (
          <PrivateRoute>
            <AddIssues></AddIssues>
          </PrivateRoute>
        ),
      },
      {
        path: "my-issues",
        element: (
          <PrivateRoute>
            <MyIssues></MyIssues>
          </PrivateRoute>
        ),
      },
      {
        path: "my-contribution",
        element: (
          <PrivateRoute>
            <MyContribution></MyContribution>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
