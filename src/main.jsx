import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Users from "./routes/Users";
import RegisterCollaborator from './routes/RegisterCollaborator'
const router = createBrowserRouter([
  {
    path: "users/",
    element: <Users></Users>,
  },
  {
    path: "register/",
    element: <Register></Register>,
  },
  {
    path: "login/",
    element: <Login></Login>,
  },
  {
    path: "collaborator/register",
    element: <RegisterCollaborator></RegisterCollaborator>
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);