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
      icon: <FontAwesomeIcon icon={faHome} />,
      label: "Dashboard",
    },
    {
      key: "/websites",
      icon: <FontAwesomeIcon icon={faGlobe} />,
      label: "Websites",
  
      children: [
        {
          key: "/add-website",
          label: "Add New Website",
          icon: <FontAwesomeIcon icon={faPlusCircle} />,
        },
        {
          key: "/list-websites",
          label: "Website List",
          icon: <FontAwesomeIcon icon={faList} />,
        },
        {
          key: "/website-data",
          label: "Website Data",
          icon: <FontAwesomeIcon icon={faChartBar} />,
        },
        {
          key: "/website-analytics",
          label: "Analytics",
          icon: <FontAwesomeIcon icon={faChartLine} />,
        },
        {
          key: "/assign-chatbot",
          label: "Assign Chatbot to Website",
          icon: <FontAwesomeIcon icon={faUserTag} />,
        },
      ],
    },
  
    {
      key: "/chatbots",
      icon: <FontAwesomeIcon icon={faComments} />,
      label: "Chatbots",
  
      children: [
        {
          key: "/list-chatbots",
          label: "Chatbot List",
          icon: <FontAwesomeIcon icon={faList} />,
        },
        {
          key: "/manage-chatbot",
          label: "Manage Chatbot",
          icon: <FontAwesomeIcon icon={faCogs} />,
        },
        {
          key: "/performance",
          label: "Chatbot Performance",
          icon: <FontAwesomeIcon icon={faTachometerAlt} />,
        },
      ],
    },
  
    {
      key: "/integrations",
      icon: <FontAwesomeIcon icon={faProjectDiagram} />,
      label: "Integrations",
  
      children: [
        {
          key: "/add-integration",
          label: "Add New Integration",
          icon: <FontAwesomeIcon icon={faPlusCircle} />,
        },
        {
          key: "/list-integrations",
          label: "Integration List",
          icon: <FontAwesomeIcon icon={faList} />,
        },
      ],
    },
  
    // {
    //   key: "/contracts",
    //   icon: <FontAwesomeIcon icon={faFileContract} />,
    //   label: "Contracts",
    // },
    // {
    //   key: "/proposals",
    //   icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
    //   label: "Proposals",
    // },
    // {
    //   key: "/validated-contracts",
    //   icon: <FontAwesomeIcon icon={faCheckCircle} />,
    //   label: "Validated Contracts",
    // },
  
    {
      key: "/calendar",
      icon: <FontAwesomeIcon icon={faCalendarAlt} />,
      label: "Schedule",
    },
    {
      key: "/admins",
      icon: <FontAwesomeIcon icon={faUserShield} />,
      label: "Admins",
  
      children: [
        {
          key: "/list-admins",
          label: "Admin List",
          icon: <FontAwesomeIcon icon={faList} />,
        },
      ],
    },
  
    {
      key: "/sales-reps",
      icon: <FontAwesomeIcon icon={faUserTie} />,
      label: "Sales Representatives",
    },
  ];
  
  const itemsCenter = [
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      key: "/help",
      icon: <FontAwesomeIcon icon={faQuestionCircle} />,
      label: "Help",
    },
  ];
  

  const filteredItems = items.filter((item) => {
    if (item.role) {
      return decodedToken.role === item.role;
    }
    return true;
  });
  console.log("filteredItems", filteredItems);

  const filteredItemsCenter = itemsCenter.filter((item) => {
    if (item.role) {
      return decodedToken.role === item.role;
    }
    return true;
  });
  console.log("filteredItemsCenter", filteredItemsCenter);

  const isActive = (path) => location.pathname === path;

  return (
  
    <Sider
    trigger={null}
    collapsible
    collapsed={collapsed}
    className="bg-black w-full"
  >
    <div className="flex justify-between w-full items-center mt-2">
      <Link to="/" className="flex px-2 flex-start mt-2">
        {!collapsed && (
          <img
            src={logo} alt="logo"
            className="w-[100px] h-[50px] mt-2"
          />
        )}
      </Link>
      <Button
        className="flex justify-end"
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: "20px", cursor: "pointer" }} /> : <MenuFoldOutlined style={{ fontSize: "20px" }} />}
        onClick={onClickHandler}
        style={{ fontSize: "30px", marginRight: "20px", color: "#fff", background: "transparent", border: "none", cursor: "pointer", outline: "none" }}
      />
    </div>

    {!collapsed && (
      <Menu
        className="mt-12 bg-black font-bold text-white"
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
              className="hover:bg-black hover:text-white"
            >
              {item.children.map((child) => (
                <Menu.Item
                  key={child.key}
                  icon={child.icon}
                  className={`${
                    isActive(child.key)
                      ? "hover:bg-black text-white rounded-full"
                      : "hover:bg-orange-700 hover:text-white"
                  }`}
                >
                  {child.label}
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              className={`${
                isActive(item.key)
                  ? "bg-orange-700 text-white rounded-full"
                  : "hover:bg-orange-600 hover:text-white text-gray-300"
              }`}
            >
              {item.label}
            </Menu.Item>
          )
        )}
      </Menu>
    )}
    <Divider style={{ backgroundColor: "#fff" }} />
    {!collapsed && (
      <Menu
        className="font-bold  bg-black text-white"
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
                ? "bg-orange-700 text-white rounded-full"
                : "hover:bg-orange-600 hover:text-white text-gray-300"
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
