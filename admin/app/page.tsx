"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { ConfigProvider, Flex, Popconfirm } from "antd";
import { SideBar, Item, Content } from "@/app/_styles/layout";
import { Title } from "@/app/_styles/texts";
import { usePathname, useRouter } from "next/navigation";
import { AppButton, IconButton } from "@/app/_styles/form";
import {
  AppstoreOutlined,
  ArrowLeftOutlined,
  LogoutOutlined,
  PlusOutlined,
  SettingOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { clearCookie, getCookie } from "@/app/_utils/cookie";

const links = [
  {
    icon: <AppstoreOutlined />,
    title: "Dashboard",
    path: "/",
  },
  {
    icon: <PlusOutlined />,
    title: "Create",
    path: "/create",
  },
  {
    icon: <ShopOutlined />,
    title: "Products",
    path: "/products",
  },
  {
    icon: <SettingOutlined />,
    title: "Settings",
    path: "/settings",
  },
];

interface Props {
  children: ReactNode;
}
export default function Admin({ children }: Props) {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    setIsSideBarOpen(globalThis.innerWidth >= 480);
    const token = getCookie("admin-token");
    if (!token || token === "") router.push("/login");
  }, []);

  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

  const logOut = () => {
    clearCookie("admin-token");
    router.push("/admin-login");
  };

  const goTo = (path: string) => {
    router.push(path);
    if (globalThis.innerWidth <= 480) toggleSideBar();
  };

  return (
    <ConfigProvider>
      <Flex>
        <SideBar className={isSideBarOpen ? "open" : ""}>
          <Flex justify="space-between" align="center" className="header">
            <Link href="/admin">
              <Title>E Shop</Title>
            </Link>
            <IconButton onClick={toggleSideBar} className="handler">
              <ArrowLeftOutlined />
            </IconButton>
          </Flex>
          <Flex vertical gap={20} justify="space-between" className="items">
            <Flex vertical gap={10}>
              {links.map((item, index) => (
                <Item
                  key={index}
                  onClick={() => goTo(item.path)}
                  className={path === item.path ? "active" : ""}
                >
                  {item.icon}
                  {item.title}
                </Item>
              ))}
            </Flex>
            <Popconfirm
              onConfirm={logOut}
              title="You can stay logged in."
              okText="Leave"
            >
              <AppButton>
                Log out <LogoutOutlined />
              </AppButton>
            </Popconfirm>
          </Flex>
        </SideBar>
        <Content className={isSideBarOpen ? "open" : ""}>{children}</Content>
      </Flex>
    </ConfigProvider>
  );
}
