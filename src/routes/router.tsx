import { createBrowserRouter } from "react-router-dom";

// components
import DefaultLayout from "@layout/DefaultLayout";

// pages
import MainPage from "@pages/main/MainPage";
import LoginPage from "@pages/login/LoginPage";
import TreasureListPage from "@pages/treasureList/TreasureListPage";
import MyTreasurePage from "@pages/myTreasure/MyTreasurePage";
import TeamLankPage from "@pages/teamLank/TeamLankPage";

const router = createBrowserRouter([
  // { path: "/", children: [{ path: "", element: <LoginPage /> }] },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "", element: <LoginPage /> },
      { path: "home", element: <MainPage /> },
      { path: "treasurelist", element: <TreasureListPage /> },
      { path: "mytreasure", element: <MyTreasurePage /> },
      { path: "team", element: <TeamLankPage /> },
    ],
  },
]);

export default router;
