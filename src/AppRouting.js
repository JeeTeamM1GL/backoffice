import { createBrowserRouter, Navigate } from "react-router-dom";
import Autentification from "./pages/Autentification/Authentification.tsx";
import MainLayout from "./MainLayout/MainLayout.tsx";
import MemoireLecture from "./pages/MemoireLecture/MemoireLecture.tsx";
import Bibliotheque from "./pages/Bibliotheque/Bibliotheque.tsx";
import Profil from "./pages/Profil/Profil.tsx";
import Home from "./pages/Home/Home.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import Categories from "./pages/Categories/Categories.tsx";
import Memoires from "./pages/Memoires/Memoires.tsx";
import Admins from "./pages/Admin/Admin.tsx";
import Bibliothecaires from "./pages/Bibliothecaire/Bibliothecaire.tsx";
import Classes from "./pages/Classe/Classe.tsx";
import Filieres from "./pages/Filiere/Filiere.tsx";
import Lecteurs from "./pages/Lecteur/Lecteur.tsx";

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
                element: <Memoires />,
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
            path: "admins",
            element: <Admins />,
          },
          {
            path: "bibliothecaires",
            element: <Bibliothecaires />,
          },
          {
            path: "classes",
            element: <Classes />,
          },
          {
            path: "filieres",
            element: <Filieres />,
          },
          {
            path: "lecteurs",
            element: <Lecteurs />,
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
