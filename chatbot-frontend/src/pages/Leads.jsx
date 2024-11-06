import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin, Table, Typography, Alert, Select, Input as AntdInput, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const Leads = () => {
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(chatData.length / pageSize);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("/data"); // Adjust to match your backend URL
        console.log("Fetched data:", response.data);
        setChatData(response.data.chatData);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const handleStatusLeadChange = (value, record) => {
    console.log("Status Lead changed for", record._id, "to", value);
    // Optionally, you could save this change to the backend.
  };

  // Define table columns with NOM and EMAIL integrated
  const columns = [
    {
      title: "NOM",
      key: "request_name",
      render: (text, record) => (
        <div>
          <div>{record.request_name || "-"}</div>
          <div className="text-gray-500 text-sm">{record.request_email || "-"}</div>
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
        const time = formattedDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
        return (
          <div>
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
      render: (text) => text || "-",
    },
    {
      title: "CAMPUS",
      dataIndex: "student",
      key: "student",
      render: (text) => text || "-",
    },
    {
        title: "STATUS LEAD",
        key: "statusLead",
        render: (text, record) => (
          <Select
            defaultValue="nouveau"
            style={{ width: 120 }}
            onChange={(value) => handleStatusLeadChange(value, record)}
          >
            <Option value="nouveau">Nouveau</Option>
            <Option value="prospect">Prospect</Option>
            <Option value="validé">Validé</Option>
          </Select>
        ),
      },
    {
      title: "SPECIALITY",
      dataIndex: "choose_course",
      key: "choose_course",
      render: (text, record) => record.program_interest || record.choose_course || "-",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text) => text || "-",
    },
    {
      title: "STATUS",
      key: "status",
      render: (text, record) => record.remmberme || record.not_talk || "-",
    },
   
  ];

  if (loading) return <Spin tip="Loading..." />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <div className=" bg-gray-50 h-screen">
      <Title
        level={1}
        className="text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 shadow-md mb-6"
      >
        🎉 Leads Dashboard 🎉
      </Title>

      <div className="mb-4 p-4 flex items-center gap-4">
        <span className="font-thin text-gray-600">Afficher</span>
        <Select defaultValue={1} onChange={handlePageChange} className="w-20 border-gray-300">
          {[...Array(totalPages)].map((_, index) => (
            <Option key={index + 1} value={index + 1}>
              {index + 1}
            </Option>
          ))}
        </Select>

        <span className="font-thin text-gray-600">résultats par page</span>
       
        <div className="flex items-center ml-auto">
          <AntdInput
            placeholder="Search..."
            prefix={<SearchOutlined />}
            style={{ borderRadius: "999px", padding: "0.5rem 1rem", maxWidth: "300px", background: "#fff" }}
          />
        </div>
        <Button type="primary" className="text-lg font-semibold px-4 py-5">
          Extraction via Email
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <Table
          columns={columns}
          dataSource={chatData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
          rowKey={(record) => record._id}
          pagination={false}
          bordered
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default Leads;
