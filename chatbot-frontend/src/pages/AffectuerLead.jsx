import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Upload,
  Breadcrumb,
  Avatar,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";

const { Option } = Select;

const AffectuerLead = () => {
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commercials, setCommercials] = useState([]);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
  const [isUnassignModalVisible, setIsUnassignModalVisible] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [form] = Form.useForm();
  const [assignForm] = Form.useForm();
  const [unassignForm] = Form.useForm();
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

 

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };
  const totalPages = Math.ceil(chatData.length / pageSize);

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const response = await axios.get("/data");
//         console.log("Fetched data:", response.data);

//         // Filter chatData for type="all"
//         const filteredData = response.data.chatData.filter(
//           (chat) => chat.type === "all"
//         );

//         setChatData(filteredData);
//       } catch (err) {
//         setError("Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUserData();
//   }, []);

useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("/data");
        console.log("Fetched data leads:", response.data);
        if (response.data && response.data.chatData) {
          const filteredData = response.data.chatData.filter(chat => chat.type === "all");
          setChatData(filteredData);
        } else {
          setChatData([]); // Fallback to an empty array
          console.error("chatData is missing in the response");
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, []);
  
  useEffect(() => {
    fetchCommercials();
  }, []);

 
  const handleAssign = async (values) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("No token found, please login first");
        return;
      }

      await axios.post(
        "/assign-leads",
        {
          id: selectedLeads,
          commercialId: values.commercial,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    //   const updatedLeads = chatData.map((lead) => {
    //     if (selectedLeads.includes(lead._id)) {
    //       return {
    //         ...lead,
    //         commercial: commercials.find(
    //           (com) => com._id === values.commercial
    //         ),
    //       };
    //     }
    //     return chatData;
    //   });
    const updatedLeads = chatData.map((lead) => {
        if (selectedLeads.includes(lead._id)) {
          return {
            ...lead,
            commercial: commercials.find(com => com._id === values.commercial),
          };
        }
        return lead; // Fix here, it was returning `chatData`
      });
      setChatData(updatedLeads);
      message.success("Leads assigned to commercial successfully");
      setIsAssignModalVisible(false);
      setSelectedLeads([]);
    } catch (error) {
      console.error("Error assigning leads:", error);
      message.error("Failed to assign leads");
    }
  };
  const fetchCommercials = async () => {
    try {
      const response = await axios.get("/commercials");
      setCommercials(response.data);
      console.log("Fetched commercials:", response.data);
    } catch (error) {
      console.error("Error fetching commercials:", error);
      message.error("Failed to fetch commercials");
    }
  };

  const handleUnassign = async () => {
    // try {
    //   const token = localStorage.getItem("token");
    //   if (!token) {
    //     message.error("No token found, please login first");
    //     return;
    //   }
    //   await axios.post(
    //     "https://go-ko-9qul.onrender.com/coaches/unassign-coaches",
    //     {
    //       coachIds: selectedCoaches,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   const updatedCoaches = coaches.map((coach) => {
    //     if (selectedCoaches.includes(coach._id)) {
    //       return {
    //         ...coach,
    //         commercial: null,
    //       };
    //     }
    //     return coach;
    //   });
    //   setCoaches(updatedCoaches);
    //   message.success("Coaches unassigned from commercial successfully");
    //   setIsUnassignModalVisible(false);
    //   setSelectedCoaches([]);
    // } catch (error) {
    //   console.error("Error unassigning coaches:", error);
    //   message.error("Failed to unassign coaches");
    // }
  };

  if (loading && showSpinner) return <Spin tip="Loading..." />;

  if (error)
    return <Alert message="Error" description={error} type="error" showIcon />;
  const columns = [
    {
      title: "NOM",
      key: "request_name" || "request_email" || "request_add_email",
      dataIndex: "request_name" || "request_email" || "request_add_email",
      render: (text, record) => (
        <div
          className="cursor-pointer"
          onClick={() => handleCoachClick(record)}
        >
          <div>{record.request_name || "-"}</div>
          <div className="text-gray-500 text-xs">
            {record.verification_email === "Non"
              ? record.request_add_email || "-"
              : record.request_email || "-"}
          </div>
        </div>
      ),
    },
    {
      title: "DATE",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        if (!date) return "-";
        const formattedDate = new Date(date);
        const day = formattedDate.toLocaleDateString("en-GB");
        const time = formattedDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return (
          <div
            className="cursor-pointer"
            onClick={() => handleCoachClick(record)}
          >
            <div>{day}</div>
            <div className="text-gray-500 text-sm">{time}</div>
          </div>
        );
      },
    },
    {
      title: "TELEPHONE",
      dataIndex: "request_phone",
      key: "request_phone",
      render: (text) => text || "-",
    },
    {
      title: "NIVEAU D'ETUDE",
      dataIndex: "course_details",
      key: "course_details",
      render: (text, record) => text || record.employee_training || "-",
    },
    {
      title: "CAMPUS",
      dataIndex: "student",
      key: "student",
      render: (text, record) =>
        text || record.salarie_details || record.découvrir || "-",
    },
    {
      title: "STATUS LEAD",
      key: "statusLead",
      render: (text, record) => (
        <Select
          defaultValue={record.type}
          style={{ width: 80 }}
          onChange={(value) => handleStatusLeadChange(value, record)}
        >
          <Option value="all">Nouveau</Option>
          <Option value="prospect">Prospect</Option>
          <Option value="client">Client</Option>
        </Select>
      ),
    },
    {
      title: "SPECIALITY",
      dataIndex: "choose_course",
      key: "choose_course",
      render: (text, record) => (
        <div className="text-gray-500 text-xs">
          {record.program_interest ||
            record.employee_training ||
            record.choose_course ||
            record.choose_course_salarie ||
            "-"}
          ,
        </div>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text, record) => text || record.training_details || "-",
    },
    {
      title: "STATUS",
      dataIndex: "not_talk" || "remmberme",
      key: "not_talk" || "remmberme",
      render: (text, record) => record.remmberme || record.not_talk || "-",
    },
    {
      title: <span style={{ fontSize: "12px" }}>Commercial</span>,
      key: "commercial",
      render: (text, record) => (
        <div>
          {record.commercial
            ? `${record.commercial.nom} ${record.commercial.nom}`
            : "N/A"}
        </div>
      ),
    },
    {
      title: <span style={{ fontSize: "12px" }}>Action</span>,
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure you want to delete this coach?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              style={{ backgroundColor: "red", color: "white" }}
              danger
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedLeads(selectedRowKeys);
    },
    selectedRowKeys: selectedLeads,
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/lead/${id}`);

      console.log("Chat deleted successfully:", response.data);
      setChatData(chatData.filter((lead) => lead._id !== id));
      message.success("Coach deleted successfully");
    } catch (error) {
      console.error("Error deleting coach:", error);
      message.error("Failed to delete coach");
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Affectation des Leads</h1>
      <div className="flex-1 space-y-2 justify-between mb-4">
        <div>
          <Button type="primary" onClick={() => setIsAssignModalVisible(true)}>
            Affecter les Leads au Commercial
          </Button>
          <Button
            type="primary"
            onClick={() => setIsUnassignModalVisible(true)}
            className="ml-2"
          >
            Désaffecter les leads du Commercial
          </Button>
        </div>
      </div>
      <div className="mb-4 p-4 flex items-center rounded-md gap-4">
        <span className="font-thin text-gray-600">Afficher</span>
        <Select
          defaultValue={1}
          onChange={handlePageChange}
          className="w-20 border-gray-300"
        >
          {[...Array(totalPages)].map((_, index) => (
            <Option key={index + 1} value={index + 1}>
              {index + 1}
            </Option>
          ))}
        </Select>

        <span className="font-thin text-gray-600">résultats par page</span>
      </div>
      <Table
        dataSource={chatData.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )}
        columns={[
          ...columns.map((col) => ({
            ...col,
            title: (
              <div className="flex flex-col items-center">
                <div className="text-xs">{col.title}</div>
              </div>
            ),
          })),
        ]}
        rowKey={(record) => record._id}
        pagination={false}
        bordered
        className="custom-table"
        rowSelection={rowSelection}
        tableLayout="fixed"
      />

      <Modal
        title="Affecter les leads au Commercial"
        visible={isAssignModalVisible}
        onCancel={() => setIsAssignModalVisible(false)}
        footer={null}
      >
        <Form form={assignForm} onFinish={handleAssign}>
          <Form.Item
            name="commercial"
            label="Commercial"
            rules={[
              {
                required: true,
                message: "Veuillez sélectionner un commercial",
              },
            ]}
          >
            <Select placeholder="Sélectionnez un commercial">
              {commercials.map((commercial) => (
                <Option key={commercial._id} value={commercial._id}>
                  {commercial.nom} {commercial.prenom}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Affecter
            </Button>
            <Button
              onClick={() => setIsAssignModalVisible(false)}
              className="ml-2"
            >
              Annuler
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Désaffecter les Leads du Commercial"
        visible={isUnassignModalVisible}
        onCancel={() => setIsUnassignModalVisible(false)}
        footer={null}
      >
        <Form form={unassignForm} onFinish={handleUnassign}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Désaffecter
            </Button>
            <Button
              onClick={() => setIsUnassignModalVisible(false)}
              className="ml-2"
            >
              Annuler
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AffectuerLead;
