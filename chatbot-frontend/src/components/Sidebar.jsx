import React, { useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../assets/images/chatbot-logo.png';
import {
  faFileContract,
  faUserTag,
  faCalendarAlt,
  faUserFriends,
  faHome,
  faUserTie,
  faUser,
  faUsers,
  faList,
  faFileImport,
  faPlusCircle,
  faQuestionCircle,
  faSpaghettiMonsterFlying,
  faGlobe,
  faComments,
  faProjectDiagram,
  faFileInvoiceDollar,
  faCheckCircle,
  faUserShield,
  faChartBar,
  faChartLine,
  faCogs,
  faTachometerAlt,

} from "@fortawesome/free-solid-svg-icons";
import {
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Divider } from "antd";

import { ToggleContext } from "./store/ToggleContext";
import { jwtDecode } from "jwt-decode";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = () => {
  const { collapsed, onClickHandler } = useContext(ToggleContext);
  // const { decodedToken } = useContext(LoginContext);
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : "";
  const navigate = useNavigate();
  const location = useLocation();

  const coachId = decodedToken?.coachId;

  const items = [
    {
      key: "/",
      icon: <FontAwesomeIcon icon={faHome} style={{ fontSize: "25px" }}/>,
      label: "Dashboard",
    },
    {
      key: "/leads",
      icon: <FontAwesomeIcon icon={faUserTie} style={{ fontSize: "25px" }}/>,
      label: "Total des Leads",
    },
    {
      key: "/websites",
      icon: <FontAwesomeIcon icon={faGlobe} style={{ fontSize: "25px" }}/>,
      label: "Websites",
  
      children: [
        {
          key: "/add-website",
          label: "Add New Website",
          icon: <FontAwesomeIcon icon={faPlusCircle} style={{ fontSize: "25px" }}/>,
        },
        {
          key: "/list-websites",
          label: "Website List",
          icon: <FontAwesomeIcon icon={faList} style={{ fontSize: "25px" }}/>,
        },
        {
          key: "/website-data",
          label: "Website Data",
          icon: <FontAwesomeIcon icon={faChartBar} style={{ fontSize: "25px" }}/>,
        },
        {
          key: "/website-analytics",
          label: "Analytics",
          icon: <FontAwesomeIcon icon={faChartLine} style={{ fontSize: "25px" }}/>,
        },
        {
          key: "/assign-chatbot",
          label: "Assign Chatbot to Website",
          icon: <FontAwesomeIcon icon={faUserTag} style={{ fontSize: "25px" }}/>,
        },
      ],
    },
  
    {
      key: "/chatbots",
      icon: <FontAwesomeIcon icon={faComments} style={{ fontSize: "25px" }}/>,
      label: "Chatbots",
  
      children: [
        {
          key: "/list-chatbots",
          label: "Chatbot List",
          icon: <FontAwesomeIcon icon={faList} style={{ fontSize: "25px" }}/>,
        },
        {
          key: "/manage-chatbot",
          label: "Manage Chatbot",
          icon: <FontAwesomeIcon icon={faCogs} style={{ fontSize: "25px" }}/>,
        },
        {
          key: "/performance",
          label: "Chatbot Performance",
          icon: <FontAwesomeIcon icon={faTachometerAlt} style={{ fontSize: "25px" }}/>,
        },
      ],
    },
  
    {
      key: "/integrations",
      icon: <FontAwesomeIcon icon={faProjectDiagram} style={{ fontSize: "25px" }}/>,
      label: "Integrations",
  
      children: [
        {
          key: "/add-integration",
          label: "Add New Integration",
          icon: <FontAwesomeIcon icon={faPlusCircle} style={{ fontSize: "25px" }}/>,
        },
        {
          key: "/list-integrations",
          label: "Integration List",
          icon: <FontAwesomeIcon icon={faList} style={{ fontSize: "25px" }}/>,
        },
      ],
    },
  
   
    {
      key: "/admins",
      icon: <FontAwesomeIcon icon={faUserShield} style={{ fontSize: "25px" }}/>,
      label: "Admins",
  
      children: [
        {
          key: "/list-admins",
          label: "Admin List",
          icon: <FontAwesomeIcon icon={faList} style={{ fontSize: "25px" }}/>,
        },
      ],
    },
  
  ];
  
  const itemsCenter = [
    {
      key: "/settings",
      icon: <SettingOutlined style={{ fontSize: "25px" }}/>,
      label: "Settings",
    },
    {
      key: "/help",
      icon: <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: "25px" }}/>,
      label: "Help",
    },
  ];
  

  const filteredItems = items.filter((item) => {
    if (item.role) {
      return decodedToken.role === item.role;
    }
    return true;
  });

  const filteredItemsCenter = itemsCenter.filter((item) => {
    if (item.role) {
      return decodedToken.role === item.role;
    }
    return true;
  });
  // const isActive = (path) => location.pathname === path;
  const isActive = (path) => {
    if (location.pathname === path) return true; // Exact match
    return path !== "/" && location.pathname.startsWith(path); // Check if path is a prefix of current pathname
  };

  return (
  
    <Sider
    trigger={null}
    collapsible
    collapsed={collapsed}
    className="bg-white w-full"
    width={240}
  >
    {!collapsed && (
      <Menu
        className=" font-bold gap-6 text-gray-600 mt-2 text-md w-full"
        theme="white"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
      >
        {filteredItems.map((item) =>
          item.children ? (
            <SubMenu
              key={item.key}
              icon={item.icon}
              title={item.label}
              className="hover:bg-white  hover:text-gray-600 w-full"
            >
              {item.children.map((child) => (
                <Menu.Item
                  key={child.key}
                  icon={child.icon}
                  className={`${
                    isActive(child.key)
                      ? "hover:bg-white  text-white rounded-full w-full"
                      : "hover:bg-purple-900 hover:text-white w-full"
                  }`}
                >
                  {child.label}
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item
              key={item.key || "/"}
              icon={item.icon}
              className={`${
                isActive(item.key)
                  ? "bg-white  text-gray-600 rounded-full w-full"
                  : "hover:bg-purple-900 hover:text-white text-gray-600 w-full"
              }`}
            >
              {item.label}
            </Menu.Item>
          )
        )}
      </Menu>
    )}
    <Divider style={{ backgroundColor: "#4B5563" }} />
    {!collapsed && (
      <Menu
        className="font-bold bg-white  text-gray-600"
        mode="inline"
        selectedKeys={[location.pathname]}
         theme="white"
      >
        {filteredItemsCenter.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            className={`${
              isActive(item.key)
                ? "bg-white text-gray-600 rounded-full"
                : "hover:bg-purple-900 hover:text-white text-gray-600"
            }`}
            onClick={() => navigate(item.key)}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    )}
  </Sider>
  );
};

export default SideBar;
