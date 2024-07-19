import { AppleOutlined, BellOutlined, BookOutlined, DashboardOutlined, FileOutlined, HomeOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, NotificationOutlined, SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Affix, Avatar, Breadcrumb, Button, Dropdown, Layout, Menu, Select, Tooltip, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './MainLayout.scss'
import { getBreadCrumbLabel } from '../utils/helpers.ts';


const { Option } = Select
const { Text, Title } = Typography
function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const splitLocation = location.pathname.split("/");
    const route: any = splitLocation[splitLocation.length - 1];
    const [collapsed, setCollapsed] = useState(false);

    const userConnected = JSON.parse(String(sessionStorage.getItem("userConnected")));
    const [breadCrumbItems, setBreadCrumbItems] = useState<object>([]);

    const [currentSelectedKeys, setCurrentSelectedKeys] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);


    const currentUrl = location.pathname;
    const handleNavigationChange = (value: string) => {
        navigate(value);
    };

    const profilMenu: any = [
        {
            key: 1,
            icon: <UserOutlined />,
            label: "Mon profil",
            onClick: () => navigate("/layout/settings/profil")
        },
        {
            type: 'divider',
        },
        {
            key: 2,
            icon: <LogoutOutlined />,
            label: "Déconnexion",
            onClick: () => navigate("/login")

        },
    ]

    const menu = (
        <Menu
            theme="light"
            //theme="dark"
            mode="inline"
            defaultSelectedKeys={currentSelectedKeys as any}
            selectedKeys={[currentSelectedKeys as any]}
            style={{
                border: "none",
                fontSize: 14,
                width: "100%",
                background: "transparent"
            }}
            items={[
                {
                    key: 'home',
                    icon: <DashboardOutlined />,
                    label: "Accueil",
                    title: "Accueil",
                    onClick: () => { navigate("/layout/home") },
                },
                {
                    key: 'admins',
                    icon: <UserOutlined />,
                    label: "Admins",
                    title: "Admins",
                    onClick: () => { navigate("/layout/admins") }
                },
                {
                    key: 'lecteurs',
                    icon: <UserOutlined />,
                    label: "Lecteurs",
                    title: "Lecteurs",
                    onClick: () => { navigate("/layout/lecteurs") }
                },
                {
                    key: 'bibliothecaires',
                    icon: <UserOutlined />,
                    label: "Bibliothécaires",
                    title: "Bibliothécaires",
                    onClick: () => { navigate("/layout/bibliothecaires") }
                },
                {
                    key: 'categories',
                    icon: <AppleOutlined />,
                    label: "Catégories",
                    title: "Catégories",
                    onClick: () => { navigate("/layout/categories") }
                },
                {
                    key: 'classes',
                    icon: <HomeOutlined />,
                    label: "Classes",
                    title: "Classes",
                    onClick: () => { navigate("/layout/classes") }
                },
                {
                    key: 'filieres',
                    icon: <HomeOutlined />,
                    label: "Filières",
                    title: "Filières",
                    onClick: () => { navigate("/layout/filieres") }
                },
                {
                    key: 'memoires',
                    icon: <BookOutlined />,
                    label: "Mémoires",
                    title: "Mémoires",
                    onClick: () => { navigate("/layout/memoires") }
                },
                {
                    key: 'libraries',
                    icon: <BookOutlined />,
                    label: "Bibliothèque",
                    title: "Bibliothèque",
                    onClick: () => { navigate("/layout/libraries") }
                },
                {
                    key: "settings",
                    label: "Paramètres",
                    title: "Paramètres",
                    icon: <SettingOutlined />,
                    children: [
                        {
                            key: 'profil',
                            label: "Mon profil",
                            title: "Mon profil",
                            icon: <UserOutlined />,
                            onClick: () => { navigate("/layout/settings/profil") }
                        }
                    ]
                }
            ]}
        />
    )

    useEffect(() => {
        console.log(currentUrl);
    }, [currentUrl]);


    useEffect(() => {

        switch (route) {
            case "home":
                setCurrentSelectedKeys("home");
                break;
            case "memoire-lecture":
                setCurrentSelectedKeys("memoires");
                break;
            case "memoires":
                setCurrentSelectedKeys("memoires");
                break;
            case "categories":
                setCurrentSelectedKeys("categories");
                break;
            case "memoire-lecture":
                setCurrentSelectedKeys("memoires");
                break;
            case "libraries":
                setCurrentSelectedKeys("libraries");
                break;
            case "memoire-lecture":
                setCurrentSelectedKeys("memoire-lecture");
                break;
            case "settings":
                setCurrentSelectedKeys("settings");
                break;
            case "profil":
                setCurrentSelectedKeys("profil");
                break;
            default:
                setCurrentSelectedKeys(route);
                break;
        }

        const pathname = location.pathname;
        const splitPathname = pathname.split("/");
        const breadCItems: object[] = [
            {
                title: <Link to="/layout/home" > <HomeOutlined /> </Link>
            }
        ]

        let link = "";
        splitPathname.forEach((element, index) => {
            if (element !== "") {
                link += `/${element}`;
                if (index === splitPathname.length - 1) {
                    breadCItems.push({
                        title: getBreadCrumbLabel(element)
                    })
                } else {
                    // if ((element !== "myspace") && (element !== "settings")) {
                    //     breadCItems.push({
                    //         title : <Link to={link} > {getBreadCrumbLabel(element)} </Link>
                    //     })
                    // }
                    breadCItems.push({
                        title: <Link to={link} > {getBreadCrumbLabel(element)} </Link>
                    })
                }
            }
        });
        setBreadCrumbItems(breadCItems)

        return () => {
            setCurrentSelectedKeys(null);
        }
    }, [route, location])

    let screenWidth = window.innerWidth;


    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Affix offsetTop={0}>
                <Header className="header" style={{
                    backgroundColor: "transparent",
                    backdropFilter: "blur(10px)", // Utilisez backdropFilter pour appliquer le flou à l'arrière-plan
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0px 24px",
                    height: 56,
                    marginLeft: screenWidth > 992 ? (collapsed ? "6%" : "20%") : 0
                }} >

                    <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }} >
                        {
                            React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger default-layout-ham',
                                onClick: () => setCollapsed(!collapsed),
                                style: {
                                    fontSize: 18
                                }
                            })
                        }

                        {/* {
                        React.createElement(MenuFoldOutlined, {
                            className: 'trigger not-default-layout-ham',
                            onClick: () => setOpen(true),
                        })
                    } */}
                        {/* <Input prefix={<SearchOutlined />} width={600} placeholder='Entrer votre recherche' /> */}
                    </div>
                    <div className='header-right' >

                        {/* {
                        isDark ?
                        <Tooltip placement="bottomRight" title={<>Mode Sombre</>} >
                            <Button type='text' icon={<TbMoonStars size={24} /> } onClick={()=> handleLightMode()} />
                        </Tooltip>
                        :
                        <Tooltip placement="bottomRight" title={<>Mode clair</>}  >
                            <Button type='text' icon={<HiOutlineSun size={24} /> } onClick={()=> handleDarkMode()} />
                        </Tooltip>
                    }   &nbsp;&nbsp;&nbsp; */}

                        <Tooltip placement="bottomRight" title={<>Notifications</>}  >
                            <Button type='text' icon={<BellOutlined style={{ fontSize: 24 }} />} /*onClick={()=>{setOpenDrawer(true)}}*/ />
                        </Tooltip>
                        &nbsp;&nbsp;&nbsp;

                        <Dropdown
                            menu={{
                                items: profilMenu
                            }}
                        >
                            <Button type='text' icon={<Avatar size="small" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />} >
                                <Text>  {userConnected ? userConnected?.firstName : "user"} </Text>
                            </Button>
                        </Dropdown>

                    </div>
                    {/* <div className="logo" /> */}
                    {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}style={{display: "flex",justifyContent:"flex-end"}}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                    <Menu.Item key="4" >
                    <Select
                        defaultValue={currentUrl}
                        style={{ width: 200, marginLeft: "auto" }}
                        onChange={handleNavigationChange}
                    >
                        <Option value="/">Page d'Authentification</Option>
                        <Option value="/bibliotheque">Bibliothèque</Option>
                        <Option value="/memoire">Mémoire</Option>
                        <Option value="/memoire-lecture">Lecture de Mémoire</Option>
                        <Option value="/profil">Profil</Option>
                    </Select>
                    </Menu.Item>
                </Menu> */}
                </Header>
            </Affix>
            <Layout>
                <Sider
                    theme='light'
                    width={"20%"}
                    style={{
                        overflow: "auto",
                        maxHeight: "100%",
                        flex: "0 0 208px",
                        boxSizing: "border-box",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        zIndex: 2

                    }}
                    trigger={null}
                    collapsible
                    className="site-layout-background"
                    collapsed={collapsed}
                >
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: 56 }} >
                        {/* <Title level={5} > PARTAGE MEMOIRE </Title> */}
                        <img src={require('./../asset/logo.png')} height={50} width={50} />
                        {
                            !collapsed &&
                            <Text> <strong style={{ fontSize: 18 }} >ISI MEMORY</strong> </Text>
                        }
                    </div>
                    {menu}
                    {/* <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        style={{ height: "100%", borderRight: 0 }}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            icon={<NotificationOutlined />}
                            title="subnav 3"
                        >
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu> */}
                </Sider>
                <Layout
                    style={{
                        padding: "8px 24px",
                        backgroundColor: "transparent",
                        marginLeft: screenWidth > 992 ? (collapsed ? "6%" : "20%") : 0,
                        minHeight: "100vh"
                    }}>

                    <Breadcrumb separator=">" items={breadCrumbItems as any} />
                    <Content
                        className="site-layout-background"
                        //className="content"
                        style={{
                            padding: "24px 0px",
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <div >
                            <Outlet />

                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default MainLayout