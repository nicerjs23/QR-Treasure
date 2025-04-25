import { createBrowserRouter } from "react-router-dom";

// components
import DefaultLayout from "@components/layout/DefaultLayout";

// pages
import MainPage from "@pages/main/MainPage";
import LoginPage from "@pages/login/LoginPage";

const router = createBrowserRouter([
  { path: "/", children: [{ path: "", element: <LoginPage /> }] },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "", element: <LoginPage /> },
      {path:"/home", element:<MainPage/>}
     
    ],
  },
]);

export default router;
