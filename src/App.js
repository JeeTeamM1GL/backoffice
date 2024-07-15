import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { Layout, Menu, Breadcrumb, Select, ConfigProvider } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Route, Routes, RouterProvider } from "react-router-dom";
import "antd/dist/reset.css"; // Importer les styles d'Ant Design
import PageAutentification from "./front/PageAutentification.tsx";
import PageBibliotheque from "./front/PageBibliotheque.tsx";
import PageMemoire from "./front/PageMemoire.tsx";
import PageMemoireLecture from "./front/PageMemoireLecture.tsx";
import PageProfile from "./front/PageProfile.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout.tsx";
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
 
  // <Router>
  //   <Routes>
  //     <Route path="/" element={<PageAutentification />} />
  //     {/* <Route path="*" element={<MainLayout />} /> */}
  //     <Route path="/bibliotheque" element={<PageBibliotheque />} />
  //     <Route path="/memoire" element={<PageMemoire />} />
  //     <Route
  //       path="/memoire-lecture"
  //       element={<PageMemoireLecture />}
  //     />
  //     <Route path="/profil" element={<PageProfile />} />
  //   </Routes>
  // </Router>
);

// const MainLayout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const currentUrl = location.pathname;
//   const handleNavigationChange = (value) => {
//     navigate(value);
//   };

//   useEffect(() => {
//     console.log(currentUrl);
//   }, [currentUrl]);
//   return (
//     <>
//       {/* <NavBar /> */}
//       <Layout style={{ minHeight: "100vh" }}>
//         <Header className="header" style={{ background: "#001529" }}>
//           <div className="logo" />
//           <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}style={{display: "flex",justifyContent:"flex-end"}}>
//             <Menu.Item key="1">nav 1</Menu.Item>
//             <Menu.Item key="2">nav 2</Menu.Item>
//             <Menu.Item key="3">nav 3</Menu.Item>
//             <Menu.Item key="4" >
//               {/* //------------------------ */}
//               <Select
//                 defaultValue={currentUrl}
//                 style={{ width: 200, marginLeft: "auto" }}
//                 onChange={handleNavigationChange}
//               >
//                 <Option value="/">Page d'Authentification</Option>
//                 <Option value="/bibliotheque">Bibliothèque</Option>
//                 <Option value="/memoire">Mémoire</Option>
//                 <Option value="/memoire-lecture">Lecture de Mémoire</Option>
//                 <Option value="/profil">Profil</Option>
//               </Select>
//               {/* //------------------------ */}
//             </Menu.Item>
//           </Menu>
//         </Header>
//         <Layout>
//           <Sider width={200} className="site-layout-background">
//             <Menu
//               mode="inline"
//               defaultSelectedKeys={["1"]}
//               defaultOpenKeys={["sub1"]}
//               style={{ height: "100%", borderRight: 0 }}
//             >
//               <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
//                 <Menu.Item key="1">option1</Menu.Item>
//                 <Menu.Item key="2">option2</Menu.Item>
//                 <Menu.Item key="3">option3</Menu.Item>
//                 <Menu.Item key="4">option4</Menu.Item>
//               </SubMenu>
//               <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
//                 <Menu.Item key="5">option5</Menu.Item>
//                 <Menu.Item key="6">option6</Menu.Item>
//                 <Menu.Item key="7">option7</Menu.Item>
//                 <Menu.Item key="8">option8</Menu.Item>
//               </SubMenu>
//               <SubMenu
//                 key="sub3"
//                 icon={<NotificationOutlined />}
//                 title="subnav 3"
//               >
//                 <Menu.Item key="9">option9</Menu.Item>
//                 <Menu.Item key="10">option10</Menu.Item>
//                 <Menu.Item key="11">option11</Menu.Item>
//                 <Menu.Item key="12">option12</Menu.Item>
//               </SubMenu>
//             </Menu>
//           </Sider>
//           <Layout style={{ padding: "0 24px 24px" ,backgroundColor:"#BEC9CB"}}>
//             <Breadcrumb style={{ margin: "16px 0" }}>
//               <Breadcrumb.Item>Home</Breadcrumb.Item>
//               <Breadcrumb.Item>List</Breadcrumb.Item>
//               <Breadcrumb.Item>App</Breadcrumb.Item>
//             </Breadcrumb>
//             <Content
//               className="site-layout-background"
//               style={{
//                 padding: 24,
//                 margin: 0,
//                 minHeight: 280,
//               }}
//             >
//               <div style={{ backgroundColor: "#F8F8F8", margin:"10px",borderRadius:"10px"}}>
//                 <Routes>
//                   <Route path="/bibliotheque" element={<PageBibliotheque />} />
//                   <Route path="/memoire" element={<PageMemoire />} />
//                   <Route
//                     path="/memoire-lecture"
//                     element={<PageMemoireLecture />}
//                   />
//                   <Route path="/profil" element={<PageProfile />} />
//                 </Routes>
//               </div>
//             </Content>
//           </Layout>
//         </Layout>
//       </Layout>
//     </>
//   );
// };

export default App;
