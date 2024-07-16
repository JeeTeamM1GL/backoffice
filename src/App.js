import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { Layout, Menu, Select, ConfigProvider } from "antd";

import { BrowserRouter as Router, Route, Routes, RouterProvider } from "react-router-dom";
import "antd/dist/reset.css"; // Importer les styles d'Ant Design

import { routes } from "./AppRouting.js";
import fr_FR from "antd/es/locale/fr_FR"
import { PRIMARY_COLOR } from "./constants/app.constants.ts";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const { Option } = Select

const App = () => (
  <ConfigProvider 
    locale={fr_FR}
    theme={{
        //algorithm : currentTheme,
        //algorithm : isDark ? theme.darkAlgorithm : theme.defaultAlgorithm ,
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
          Layout : {
             bodyBg : "#dfe4ea"
          }
        }
    }}
  >
     <RouterProvider router={routes} />
  </ConfigProvider>
 
)

export default App;
