import { createBrowserRouter } from "react-router-dom";

// components
import DefaultLayout from "@layout/DefaultLayout";
import ProtectedLayout from "@layout/ProtectedLayout";
// pages
import MainPage from "@pages/main/MainPage";
import LoginPage from "@pages/login/LoginPage";
import TreasureListPage from "@pages/treasureList/TreasureListPage";
import MyTreasurePage from "@pages/myTreasure/MyTreasurePage";
import TeamLankPage from "@pages/teamLank/TeamLankPage";
import QRTreasurePage from "@pages/qrTreasure/QRTreasurePage";
import FindQRTreasurePage from "@pages/qrTreasure/FindQRTreasurePage";
import QRRedirect from "@pages/qrTreasure/QRRedirect";
import AdminPage from "@pages/admin/AdminPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "", element: <LoginPage /> },
      { path: "qr-redirect", element: <QRRedirect /> }, // QR 진입점
      { path: "admin", element: <AdminPage /> }, //관리자 페이지 추가
      {
        element: <ProtectedLayout />,
        children: [
          { path: "home", element: <MainPage /> },
          { path: "treasurelist", element: <TreasureListPage /> },
          { path: "mytreasure", element: <MyTreasurePage /> },
          { path: "team", element: <TeamLankPage /> },
          { path: "qr", element: <QRTreasurePage /> },
          { path: "qrfind", element: <FindQRTreasurePage /> },
        ],
      },
    ],
  },
]);

export default router;
