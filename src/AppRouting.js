import { createBrowserRouter, Navigate } from "react-router-dom";
import Autentification from "./pages/Autentification/Authentification.tsx";
import MainLayout from "./MainLayout/MainLayout.tsx";
import Profil from "./pages/Profil/Profil.tsx";
import Home from "./pages/Home/Home.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import DetailsHotel from "./pages/DetailsHotel/DetailsHotel.tsx";
import Hotels from "./pages/Hotels/Hotels.tsx";
import DetailsReservation from "./pages/DetailsReservation/DetailsReservation.tsx";
import DetailsRoom from "./pages/DetailsRoom/DetailsRoom.tsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/layout"} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <Autentification />,
  },
  {
    path: "layout",
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: "*",
            element: <NotFound />,
          },
          {
            path: "",
            element: <Navigate to={"/layout/home"} />,
          },
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "hotels",
            children: [
              {
                path: "",
                element: <Hotels />,
              },
              {
                path: "details-hotel",
                children: [
                  {
                    path: "",
                    element: <DetailsHotel />,
                  },
                  {
                    path: "details-room",
                    element: <DetailsRoom />,
                  },
                  {
                    path: "details-reservation",
                    element: <DetailsReservation />,
                  },
                ],
              },
            ],
          },
          {
            path: "settings",
            children: [
              {
                path: "",
                element: <Navigate to={"/layout/settings/profil"} />,
              },
              {
                path: "profil",
                element: <Profil />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
