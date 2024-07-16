import { createBrowserRouter, Navigate } from "react-router-dom";
import Autentification from "./pages/Autentification/Authentification.tsx";
import MainLayout from "./MainLayout/MainLayout.tsx";
import MemoireLecture from "./pages/MemoireLecture/MemoireLecture.tsx";
import Memoire from "./pages/Memoire/Memoire.tsx";
import Bibliotheque from "./pages/Bibliotheque/Bibliotheque.tsx";
import Profil from "./pages/Profil/Profil.tsx";
import Home from "./pages/Home/Home.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import Categories from "./pages/Categories/Categories.tsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/login"} />,
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
            path: "categories",
            element: <Categories />,
          },
          {
            path: "memoires",
            children: [
              {
                path: "",
                element: <Memoire />,
              },
              {
                path: "memoire-lecture",
                element: <MemoireLecture />,
              },
            ],
          },
          {
            path: "libraries",
            element: <Bibliotheque />,
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
