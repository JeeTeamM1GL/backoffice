import logo from "./logo.svg";
import "./App.css";
import React, {useContext, useEffect, useState} from "react";
import {Layout, Menu, Select, ConfigProvider, theme, message} from "antd";

import { BrowserRouter as Router, Route, Routes, RouterProvider } from "react-router-dom";
import "antd/dist/reset.css"; // Importer les styles d'Ant Design
import {keycloak, initKeycloak} from "./config/keycloak.ts";
import { routes } from "./AppRouting.js";
import fr_FR from "antd/es/locale/fr_FR"
import { PRIMARY_COLOR } from "./constants/app.constants.ts";
import { ThemeContext } from "./utils/providers/ThemeProvider.tsx";
import Keycloak from "keycloak-js";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const { Option } = Select


/*let initOptions = {
    url: 'http://localhost:8080',
    realm: 'booking-realm',
    clientId: 'booking-client'
}

export let kc = new Keycloak(initOptions);

kc.init({
    onLoad: 'login-required',
    redirectUri : "http://localhost:3000",
    silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
})
    .then((auth)=>{
        if (!auth){
            window.location.reload()
        }else {
            sessionStorage.setItem("accessToken",kc.token);
            sessionStorage.setItem("userInfos", JSON.parse(kc.userInfo))
            message.success("Bienvenue cher utilisateur");
        }

        kc.onTokenExpired = ()=>{
            message.info("Session expirée")
        }
    })
    .catch((err)=>{
        console.log(err)
    }) */

const App = () => {
  const {isDark} = useContext(ThemeContext);
    const [keycloakInitialized, setKeycloakInitialized] = useState(false);

    useEffect(() => {
        initKeycloak().then((authenticated) => {
            setKeycloakInitialized(authenticated);
        }).catch(err => {
            console.error("Failed to initialize Keycloak", err);
        });
    }, []);

    if (!keycloakInitialized) {
        return <div>Loading...</div>;
    }

  return <ConfigProvider 
    locale={fr_FR}
    theme={{
        //algorithm : currentTheme,
        algorithm : isDark ? theme.darkAlgorithm : theme.defaultAlgorithm ,
        token : {
          colorPrimary : PRIMARY_COLOR ,
          colorLink : PRIMARY_COLOR,
          borderRadius : 6,
          
        },
        components : {
          Segmented : {
            itemSelectedBg : PRIMARY_COLOR ,
            itemSelectedColor : '#ffff'
          },
          Menu : {
            // darkItemSelectedBg : PRIMARY_COLOR,
            // darkItemSelectedColor : "#ffff",
            itemSelectedBg  : PRIMARY_COLOR,
            itemSelectedColor : "#ffff"
          },
          Layout : {
            bodyBg : isDark ? "#000" : "#dfe4ea",
            
             
          }
        }
    }}
  >
     <RouterProvider router={routes} />
  </ConfigProvider>
 
}

export default App;
