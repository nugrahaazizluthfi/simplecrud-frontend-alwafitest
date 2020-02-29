import React from 'react';
import { Layout, Menu } from 'antd';
import { AlignLeftOutlined, LaptopOutlined } from '@ant-design/icons';
import {
    Link,
} from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const MyLayout = ({ children }) => {
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">
                        Al Wafi Test - Luthfi Aziz Nugraha
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['listOfMeals']}
                            style={{ height: '100%' }}
                        >
                            <Menu.Item key="1">
                                <Link to="/">Home</Link>
                            </Menu.Item>
                            <SubMenu
                                key="listOfMeals"
                                title={
                                    <span>
                                        <LaptopOutlined />
                                        Meals
                                    </span>
                                }
                            >
                                <Menu.Item key="5">
                                    <Link to="/meals">
                                        <AlignLeftOutlined />
                                        Lists Of Meals</Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 600 }}>
                        {children}
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}

export default MyLayout;