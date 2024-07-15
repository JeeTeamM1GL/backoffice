import { createBrowserRouter, Navigate } from "react-router-dom";
import PageAutentification from "./front/PageAutentification.tsx";
import MainLayout from "./MainLayout/MainLayout.tsx";
import PageMemoireLecture from "./front/PageMemoireLecture.tsx";
import PageMemoire from "./front/PageMemoire.tsx";
import PageBibliotheque from "./front/PageBibliotheque.tsx";
import PageProfile from "./front/PageProfile.tsx";
import Home from "./pages/Home/Home.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";


export const routes = createBrowserRouter([
    {
        path : "/",
        element : <Navigate to={"/login"} />
    },
    {
        path : "*",
        element : <NotFound />
    },
    {
        path : "/login",
        element : <PageAutentification />
    },
    {
        path : "layout",
        children : [
            {
                path : "",
                element : <MainLayout />,
                children : [
                    {
                        path : "*",
                        element : <NotFound />
                    },
                    {
                        path : "",
                        element : <Navigate to={"/layout/home"} />
                    },
                    {
                        path : "home",
                        element : <Home />
                    },
                    {
                        path : "memoires",
                        children : [
                            {
                                path : "",
                                element : <PageMemoire />
                            },
                            {
                                path : "memoire-lecture",
                                element : <PageMemoireLecture />
                            },
                        ]
                    },
                    {
                        path : "libraries", 
                        element : <PageBibliotheque />
                    },
                    {
                        path : "settings",
                        children : [
                            {
                                path : "",
                                element : <Navigate to={"/layout/settings/profil"} />
                            },
                            {
                                path : "profil",
                                element : <PageProfile />
                            }
                        ]
                    },
                ]
            }
        ]
    }
])