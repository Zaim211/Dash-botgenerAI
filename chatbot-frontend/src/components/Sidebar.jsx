import React, { useContext, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserTie,
  faCaretLeft,
  faList,
  faPlusCircle,
  faQuestionCircle,
  faFlag,
  faGear,
  faThLarge,
  faBullhorn,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {  UserOutlined } from "@ant-design/icons";
import {
  Layout,
  Menu,
  Divider,
  Avatar,
} from "antd";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { UserContext } from "../UserContext";


const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = () => {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : "";
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken } = useContext(UserContext);
  const [profileVisible, setProfileVisible] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const showProfile = () => setProfileVisible(true);

  const toggleCollapsed = () => setCollapsed(!collapsed)

  const Logout = async () => {
    await axios.post("/logout");
    setToken(null);
    navigate("/SignIn");
  };

  const getInitials = (name) => {
    const names = name?.split(" ");
    const initials = names?.map((n) => n[0]).join("");
    return initials?.toUpperCase();
  };

  const items = [
    {
      key: "/",
      icon: (
        <FontAwesomeIcon
          icon={faHome}
          style={{ fontSize: "23px", marginRight: "10px" }}
        />
      ),
      label: "Dashboard",
    },
    {
      key: "/leads",
      icon: (
        <FontAwesomeIcon
          icon={faUserTie}
          style={{ fontSize: "23px", marginRight: "10px" }}
        />
      ),
      label: "Contacts",
    },
    {
      key: "/programmes",
      icon: (
        <FontAwesomeIcon
          icon={faThLarge}
          style={{ fontSize: "23px", marginRight: "10px" }}
        />
      ),
      label: "Programmes",
    },
    {
      key: "/entreprise",
      icon: (
        <FontAwesomeIcon
          icon={faFlag}
          style={{ fontSize: "23px", marginRight: "10px" }}
        />
      ),
      label: "Entreprises",
    },
    {
      key: "/campagnes",
      icon: (
        <FontAwesomeIcon
          icon={faBullhorn}
          style={{ fontSize: "23px", marginRight: "10px" }}
        />
      ),
      label: "Campagnes",
      children: [
        {
          key: "/bannières",
          label: "Bannières",
          icon: (
            <FontAwesomeIcon
              icon={faPlusCircle}
              style={{ fontSize: "23px", marginRight: "10px" }}
            />
          ),
        },
        {
          key: "/magic-sms",
          label: "Magic SMS",
          icon: (
            <FontAwesomeIcon
              icon={faList}
              style={{ fontSize: "23px", marginRight: "10px" }}
            />
          ),
        },
      ],
    },
  ];

  const filteredItems = items.filter(
    (item) => decodedToken?.role === item.role || !item.role
  );

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  return (
  //   <Sider
  //     trigger={null}
  //     collapsible
  //     collapsed={collapsed}
  //     className="bg-white w-full flex flex-col"
  //     width={240}
  //   >
  //     <div className="absolute top-4 right-0  cursor-pointer text-purple-900 text-4xl" onClick={toggleCollapsed} >
  //   <FontAwesomeIcon icon={faCaretLeft}  />
  // </div>
  //     {!collapsed && (
  //       <>
  //         {/* Profile Section - Top */}
  //         <div className="flex items-center space-x-2 px-7 py-4">
  //           <Avatar
  //             src={profileImage}
  //             className="bg-purple-900 text-white text-lg rounded-md font-bold cursor-pointer hover:shadow-lg transition-all duration-300"
  //             size={40}
  //           >
  //             {!profileImage &&
  //               (decodedToken ? (
  //                 getInitials(decodedToken.name)
  //               ) : (
  //                 <UserOutlined />
  //               ))}
  //           </Avatar>
  //           <div
  //             className="text-gray-800 text-md font-medium cursor-pointer hover:text-blue-600"
  //             onClick={showProfile}
  //           >
  //             <div>{decodedToken?.name}</div>
  //             <div className="text-sm text-gray-500">{decodedToken?.role}</div>
  //           </div>
            
  //         </div>
  //         {/* Sidebar Menu - Main Items */}
  //         <Menu
  //           className="font-bold gap-12 text-gray-600 mt-2 text-md w-full flex-grow"
  //           theme="white"
  //           mode="inline"
  //           selectedKeys={[location.pathname]}
  //           onClick={({ key }) => navigate(key)}
  //         >
  //           {filteredItems.map((item) =>
  //             item.children ? (
  //               <SubMenu key={item.key} icon={item.icon} title={item.label}>
  //                 {item.children.map((child) => (
  //                   <Menu.Item
  //                     key={child.key}
  //                     icon={child.icon}
  //                     className={
  //                       isActive(child.key)
  //                         ? "bg-white text-gray-600"
  //                         : "hover:bg-purple-900 hover:text-white"
  //                     }
  //                   >
  //                     {child.label}
  //                   </Menu.Item>
  //                 ))}
  //               </SubMenu>
  //             ) : (
  //               <Menu.Item
  //                 key={item.key}
  //                 icon={item.icon}
  //                 className={
  //                   isActive(item.key)
  //                     ? "bg-white text-gray-600"
  //                     : "hover:bg-purple-900 hover:text-white"
  //                 }
  //               >
  //                 {!collapsed && item.label}
  //               </Menu.Item>
  //             )
  //           )}
  //         </Menu>

  //         <Divider className="h-[2px]" style={{ backgroundColor: "#D1D5DB" }} />

  //         {/* Help, Settings, and Logout Section */}
  //         <div className="mt-auto">
  //           <Menu
  //             className="font-bold bg-white text-gray-600"
  //             mode="inline"
  //             selectedKeys={[location.pathname]}
  //             theme="white"
  //           >
  //             <Menu.Item
  //               key="/help"
  //               icon={
  //                 <FontAwesomeIcon
  //                   icon={faQuestionCircle}
  //                   style={{ fontSize: "23px", marginRight: "10px" }}
  //                 />
  //               }
  //               onClick={() => navigate("/help")}
  //             >
  //               {!collapsed && "Help"}
  //             </Menu.Item>
  //             <Menu.Item
  //               key="/settings"
  //               icon={
  //                 <FontAwesomeIcon
  //                   icon={faGear}
  //                   style={{ fontSize: "23px", marginRight: "10px" }}
  //                 />
  //               }
  //               onClick={() => navigate("/settings")}
  //             >
  //                {!collapsed && "Settings"}
  //             </Menu.Item>
  //             <Menu.Item
  //               key="logout"
  //               icon={
  //                 <FontAwesomeIcon
  //                   icon={faSignOutAlt}
  //                   style={{ fontSize: "23px", marginRight: "10px" }}
  //                 />
  //               }
  //               onClick={Logout}
  //             >
  //               {!collapsed && "Logout"}
  //             </Menu.Item>
  //           </Menu>
  //         </div>
  //       </>
  //     )}
  //   </Sider>
  <Sider
  trigger={null}
  collapsible
  collapsed={collapsed}
  className="bg-white w-full flex flex-col"
  width={240}
>
  <div
    className="absolute top-4 right-0 cursor-pointer text-purple-900 text-4xl"
    onClick={toggleCollapsed}
  >
    <FontAwesomeIcon icon={faCaretLeft} />
  </div>

  {/* Profile Section - Always Visible Avatar */}
  <div className={`flex items-center space-x-2 px-7 py-4 ${collapsed ? "justify-start pl-1" : ""}`}>
    <Avatar
      src={profileImage}
      className="bg-purple-900 text-white text-lg rounded-md font-bold cursor-pointer hover:shadow-lg transition-all duration-300"
      size={40}
    >
      {!profileImage &&
        (decodedToken ? (
          getInitials(decodedToken.name)
        ) : (
          <UserOutlined />
        ))}
    </Avatar>
    {!collapsed && (
      <div
        className="text-gray-800 text-md font-medium cursor-pointer hover:text-blue-600"
        onClick={showProfile}
      >
        <div>{decodedToken?.name}</div>
        <div className="text-sm text-gray-500">{decodedToken?.role}</div>
      </div>
    )}
  </div>

  {/* Sidebar Menu - Main Items */}
  <Menu
    className="font-bold text-gray-600 mt-2 w-full flex-grow"
    theme="white"
    mode="inline"
    selectedKeys={[location.pathname]}
    onClick={({ key }) => navigate(key)}
  >
    {filteredItems.map((item) =>
      item.children ? (
        <SubMenu key={item.key} icon={item.icon} title={!collapsed && item.label}>
          {item.children.map((child) => (
            <Menu.Item
              key={child.key}
              icon={child.icon}
              className={
                isActive(child.key)
                  ? "bg-white text-gray-600"
                  : "hover:bg-purple-900 hover:text-white"
              }
            >
              {!collapsed && child.label}
            </Menu.Item>
          ))}
        </SubMenu>
      ) : (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          className={
            isActive(item.key)
              ? "bg-white text-gray-600"
              : "hover:bg-purple-900 hover:text-white"
          }
        >
          {!collapsed && item.label}
        </Menu.Item>
      )
    )}
  </Menu>

  <Divider className="h-[2px]" style={{ backgroundColor: "#D1D5DB" }} />

  {/* Help, Settings, and Logout Section */}
  <div className="mt-auto">
    <Menu
      className="font-bold bg-white text-gray-600"
      mode="inline"
      selectedKeys={[location.pathname]}
      theme="white"
    >
      {/* <Menu.Item
        key="/help"
        icon={<FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: "23px" }} />}
        onClick={() => navigate("/help")}
      >
        {!collapsed && "Help"}
      </Menu.Item> */}
      <Menu.Item
        key="/settings"
        icon={<FontAwesomeIcon icon={faGear} style={{ fontSize: "23px" }} />}
        onClick={() => navigate("/settings")}
      >
        {!collapsed && "Settings"}
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: "23px" }} />}
        onClick={Logout}
      >
        {!collapsed && "Logout"}
      </Menu.Item>
    </Menu>
  </div>
</Sider>

  );
};

export default SideBar;















// import React, { useContext, useState } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome, faUserTie, faList, faPlusCircle, faQuestionCircle, faFlag, faGear, faEdit, faClose, faThLarge, faBullhorn } from "@fortawesome/free-solid-svg-icons";
// import { SettingOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
// import { Layout, Menu, Divider, Avatar, Button, Dropdown, Modal, Form, Input as AntdInput } from "antd";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
// import { UserContext } from "../UserContext"; // Make sure this context exists
// import { ToggleContext } from "./store/ToggleContext";
// const { Sider } = Layout;
// const { SubMenu } = Menu;

// const SideBar = () => {
//   const { collapsed } = useContext(ToggleContext);
//   const token = localStorage.getItem("token");
//   const decodedToken = token ? jwtDecode(token) : "";
//   console.log('decodedToken', decodedToken);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { setToken } = useContext(UserContext);
//   const [profileVisible, setProfileVisible] = useState(false);
//   const [profileImage, setProfileImage] = useState("");

//   const showProfile = () => setProfileVisible(true);
//   const hideProfile = () => setProfileVisible(false);

//   const Logout = async () => {
//     await axios.post("/logout");
//     setToken(null);
//     navigate("/SignIn");
//   };

//   const getInitials = (name) => {
//     const names = name?.split(" ");
//     const initials = names?.map((n) => n[0]).join("");
//     return initials?.toUpperCase();
//   };

//   const items = [
//     {
//       key: "/",
//       icon: <FontAwesomeIcon icon={faHome} style={{ fontSize: "23px", marginRight: "10px" }} />,
//       label: "Dashboard",
//     },
//     {
//       key: "/leads",
//       icon: <FontAwesomeIcon icon={faUserTie} style={{ fontSize: "23px", marginRight: "10px" }} />,
//       label: "Contacts",
//     },
//     {
//       key: "/programmes",
//       icon: <FontAwesomeIcon icon={faThLarge} style={{ fontSize: "23px", marginRight: "10px" }} />,
//       label: "Programmes",
//     },
//     {
//       key: "/entreprises",
//       icon: <FontAwesomeIcon icon={faFlag} style={{ fontSize: "23px", marginRight: "10px" }} />,
//       label: "Entreprises",
//     },
//     {
//       key: "/campagnes",
//       icon: <FontAwesomeIcon icon={faBullhorn} style={{ fontSize: "23px", marginRight: "10px" }} />,
//       label: "Campagnes",
//       children: [
//         {
//           key: "/bannières",
//           label: "Bannières",
//           icon: <FontAwesomeIcon icon={faPlusCircle} style={{ fontSize: "23px", marginRight: "10px" }} />,
//         },
//         {
//           key: "/magic-sms",
//           label: "Magic SMS",
//           icon: <FontAwesomeIcon icon={faList} style={{ fontSize: "23px", marginRight: "10px" }} />,
//         },
//       ],
//     },
//   ];

//   const itemsCenter = [
//     {
//       key: "/settings",
//       icon: <FontAwesomeIcon icon={faGear} style={{ fontSize: "23px", marginRight: "10px" }} />,
//       label: "Settings",
//     },
//     {
//       key: "/help",
//       icon: <FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: "23px", marginRight: "10px" }} />,
//       label: "Help",
//     },
//   ];

//   const menu = (
//     <Menu>
//       <Menu.Item key="settings" icon={<SettingOutlined />}>Settings</Menu.Item>
//       <Menu.Item onClick={Logout} key="logout" icon={<LogoutOutlined />}>Logout</Menu.Item>
//     </Menu>
//   );

//   const filteredItems = items.filter((item) => decodedToken?.role === item.role || !item.role);
//   const filteredItemsCenter = itemsCenter.filter((item) => decodedToken?.role === item.role || !item.role);

//   const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

//   return (
//     <Sider trigger={null} collapsible collapsed={collapsed} className="bg-white w-full flex flex-col" width={240}>
//       {!collapsed && (
//         <>
//           {/* Sidebar Menu */}
//           <Menu
//             className="font-bold gap-12 text-gray-600 mt-2 text-md w-full flex-grow"
//             theme="white"
//             mode="inline"
//             selectedKeys={[location.pathname]}
//             onClick={({ key }) => navigate(key)}
//           >
//             {filteredItems.map((item) =>
//               item.children ? (
//                 <SubMenu key={item.key} icon={item.icon} title={item.label}>
//                   {item.children.map((child) => (
//                     <Menu.Item key={child.key} icon={child.icon} className={isActive(child.key) ? "bg-white text-gray-600" : "hover:bg-purple-900 hover:text-white"}>
//                       {child.label}
//                     </Menu.Item>
//                   ))}
//                 </SubMenu>
//               ) : (
//                 <Menu.Item key={item.key} icon={item.icon} className={isActive(item.key) ? "bg-white text-gray-600" : "hover:bg-purple-900 hover:text-white"}>
//                   {item.label}
//                 </Menu.Item>
//               )
//             )}
//           </Menu>

//           <Divider style={{ backgroundColor: "#4B5563" }} />

//        {!collapsed && (
//         <Menu
//           className="font-bold bg-white  text-gray-600"
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           theme="white"
//         >
//           {filteredItemsCenter.map((item) => (
//             <Menu.Item
//               key={item.key}
//               icon={item.icon}
//               className={`${
//                 isActive(item.key)
//                   ? "bg-white text-gray-600 rounded-full"
//                   : "hover:bg-purple-900 hover:text-white text-gray-600"
//               }`}
//               onClick={() => navigate(item.key)}
//             >
//               {item.label}
//             </Menu.Item>
//           ))}
//         </Menu>
//       )}

//           {/* Profile Section at the bottom */}
//           <div className="mt-auto flex items-center space-x-6 px-4 py-2">
//             <Avatar
//               src={profileImage}
//               className="bg-gray-800 text-white cursor-pointer hover:shadow-lg transition-all duration-300"
//               size={40}
//             >
//               {!profileImage && (decodedToken ? getInitials(decodedToken.name) : <UserOutlined />)}
//             </Avatar>
//             <div className="text-gray-800 text-lg font-medium cursor-pointer hover:text-blue-600" onClick={showProfile}>
//               <div>{decodedToken?.name}</div>
//               <div className="text-sm text-gray-500">{decodedToken?.role}</div>
//             </div>
//             <Dropdown overlay={menu}>
//               <SettingOutlined className="text-gray-800 text-2xl cursor-pointer hover:text-blue-600 transition-all duration-200" />
//             </Dropdown>
//           </div>

//           {/* Profile Modal */}
//           <Modal title="Profile" visible={profileVisible} onCancel={hideProfile} footer={null} className="rounded-md">
//             <Form layout="vertical">
//               <Form.Item label="Name">
//                 <AntdInput defaultValue={decodedToken?.name} />
//               </Form.Item>
//               <Form.Item label="Role">
//                 <AntdInput defaultValue={decodedToken?.role} />
//               </Form.Item>
//               <Link to="/profile">
//                 <Button onClick={hideProfile} type="primary" icon={<FontAwesomeIcon icon={faEdit} />} className="mr-2">
//                   Edit
//                 </Button>
//               </Link>
//               <Button onClick={hideProfile} icon={<FontAwesomeIcon icon={faClose} />}>Close</Button>
//             </Form>
//           </Modal>
//         </>
//       )}
//     </Sider>
//   );
// };

// export default SideBar;

// import React, { useContext } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHome,
//   faUserTie,
//   faList,
//   faPlusCircle,
//   faQuestionCircle,
//   faFlag,
//   faUserShield,
//   faThLarge,
//   faBullhorn,
// } from "@fortawesome/free-solid-svg-icons";
// import { SettingOutlined } from "@ant-design/icons";
// import { Layout, Menu, Divider } from "antd";

// import { ToggleContext } from "./store/ToggleContext";
// import { jwtDecode } from "jwt-decode";

// const { Sider } = Layout;
// const { SubMenu } = Menu;

// const SideBar = () => {
//   const { collapsed, onClickHandler } = useContext(ToggleContext);
//   // const { decodedToken } = useContext(LoginContext);
//   const token = localStorage.getItem("token");
//   const decodedToken = token ? jwtDecode(token) : "";
//   const navigate = useNavigate();
//   const location = useLocation();

//   const coachId = decodedToken?.coachId;

//   const items = [
//     {
//       key: "/",
//       icon: (
//         <FontAwesomeIcon
//           icon={faHome}
//           style={{ fontSize: "23px", marginRight: "10px" }}
//         />
//       ),
//       label: "Dashboard",
//     },
//     {
//       key: "/leads",
//       icon: (
//         <FontAwesomeIcon
//           icon={faUserTie}
//           style={{ fontSize: "23px", marginRight: "10px" }}
//         />
//       ),
//       label: "Contacts",
//     },
//     {
//       key: "/programmes",
//       icon: (
//         <FontAwesomeIcon
//           icon={faThLarge}
//           style={{ fontSize: "23px", marginRight: "10px" }}
//         />
//       ),
//       label: "Programmes",
//     },

//     {
//       key: "/entreprises",
//       icon: (
//         <FontAwesomeIcon
//           icon={faFlag}
//           style={{ fontSize: "23px", marginRight: "10px" }}
//         />
//       ),
//       label: "Entreprises",
//     },

//     {
//       key: "/campagnes",
//       icon: (
//         <FontAwesomeIcon
//           icon={faBullhorn}
//           style={{ fontSize: "23px", marginRight: "10px" }}
//         />
//       ),
//       label: "Campagnes",

//       children: [
//         {
//           key: "/bannières",
//           label: "Bannières",
//           icon: (
//             <FontAwesomeIcon
//               icon={faPlusCircle}
//               style={{ fontSize: "23px", marginRight: "10px" }}
//             />
//           ),
//         },
//         {
//           key: "/magic-sms",
//           label: "Magic SMS",
//           icon: (
//             <FontAwesomeIcon
//               icon={faList}
//               style={{ fontSize: "23px", marginRight: "10px" }}
//             />
//           ),
//         },
//       ],
//     },

//     {
//       key: "/admins",
//       icon: (
//         <FontAwesomeIcon
//           icon={faUserShield}
//           style={{ fontSize: "23px", marginRight: "10px" }}
//         />
//       ),
//       label: "Admins",

//       children: [
//         {
//           key: "/list-admins",
//           label: "Admin List",
//           icon: (
//             <FontAwesomeIcon
//               icon={faList}
//               style={{ fontSize: "23px", marginRight: "10px" }}
//             />
//           ),
//         },
//       ],
//     },
//   ];

//   const itemsCenter = [
//     {
//       key: "/settings",
//       icon: (
//         <SettingOutlined style={{ fontSize: "23px", marginRight: "10px" }} />
//       ),
//       label: "Settings",
//     },
//     {
//       key: "/help",
//       icon: (
//         <FontAwesomeIcon
//           icon={faQuestionCircle}
//           style={{ fontSize: "23px", marginRight: "10px" }}
//         />
//       ),
//       label: "Help",
//     },
//   ];

//   const filteredItems = items.filter((item) => {
//     if (item.role) {
//       return decodedToken.role === item.role;
//     }
//     return true;
//   });

//   const filteredItemsCenter = itemsCenter.filter((item) => {
//     if (item.role) {
//       return decodedToken.role === item.role;
//     }
//     return true;
//   });
//   // const isActive = (path) => location.pathname === path;
//   const isActive = (path) => {
//     if (location.pathname === path) return true; // Exact match
//     return path !== "/" && location.pathname.startsWith(path); // Check if path is a prefix of current pathname
//   };

//   return (
//     <Sider
//       trigger={null}
//       collapsible
//       collapsed={collapsed}
//       className="bg-white w-full"
//       width={240}
//     >
//       {!collapsed && (
//         <Menu
//           className=" font-bold gap-12 text-gray-600 mt-2 text-md w-full"
//           theme="white"
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           onClick={({ key }) => navigate(key)}
//         >
//           {filteredItems.map((item) =>
//             item.children ? (
//               <SubMenu
//                 key={item.key}
//                 icon={item.icon}
//                 title={item.label}
//                 className="hover:bg-white  hover:text-gray-600 w-full"
//               >
//                 {item.children.map((child) => (
//                   <Menu.Item
//                     key={child.key}
//                     icon={child.icon}
//                     className={`${
//                       isActive(child.key)
//                         ? "hover:bg-white  text-white rounded-full w-full"
//                         : "hover:bg-purple-900 hover:text-white w-full"
//                     }`}
//                   >
//                     {child.label}
//                   </Menu.Item>
//                 ))}
//               </SubMenu>
//             ) : (
//               <Menu.Item
//                 key={item.key || "/"}
//                 icon={item.icon}
//                 className={`${
//                   isActive(item.key)
//                     ? "bg-white  text-gray-600 rounded-full w-full"
//                     : "hover:bg-purple-900 hover:text-white text-gray-600 w-full"
//                 }`}
//               >
//                 {item.label}
//               </Menu.Item>
//             )
//           )}
//         </Menu>
//       )}
//       <Divider style={{ backgroundColor: "#4B5563" }} />
//       {!collapsed && (
//         <Menu
//           className="font-bold bg-white  text-gray-600"
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           theme="white"
//         >
//           {filteredItemsCenter.map((item) => (
//             <Menu.Item
//               key={item.key}
//               icon={item.icon}
//               className={`${
//                 isActive(item.key)
//                   ? "bg-white text-gray-600 rounded-full"
//                   : "hover:bg-purple-900 hover:text-white text-gray-600"
//               }`}
//               onClick={() => navigate(item.key)}
//             >
//               {item.label}
//             </Menu.Item>
//           ))}
//         </Menu>
//       )}
//     </Sider>
//   );
// };

// export default SideBar;
