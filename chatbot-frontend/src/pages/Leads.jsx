import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Spin,
  Table,
  Alert,
  Select,
  Button,
  Popconfirm,
  Space,
  message,
  Input,
} from "antd";
import { useNavigate } from "react-router-dom";
import {

  DeleteOutlined,

} from "@ant-design/icons";

const { Option } = Select;

const Leads = () => {
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showSpinner, setShowSpinner] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);


  const handlePageChange = (value) => {
    setCurrentPage(value);
  };
  const handleCoachClick = (chatData) => {
    navigate(`/lead/${chatData._id}`);
  };

 

  const totalPages = Math.ceil(chatData.length / pageSize);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("/data"); // Adjust to match your backend URL
        console.log("Fetched data:", response.data);
        setChatData(response.data.chatData);
        setFilteredData(response.data.chatData);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);


  const handleStatusLeadChange = async (statusLead, record) => {
    try {
      const validStatuses = ['nouveau', 'prospect', 'client'];
      if (statusLead === 'all') {
        statusLead = 'nouveau'; // Treat 'all' as 'nouveau'
      }
      if (!validStatuses.includes(statusLead)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }
      const response = await axios.put(`/updateStatusLead/${record._id}`, {
        statusLead,  // Ensure you're passing the statusLead in the body
      });
      console.log('Updated status:', response.data);
    } catch (error) {
      console.error('Error updating status:', error);
    }
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

  const handleColumnSearch = async (e, columnKey) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    try {
      if (value.trim() === '') {
        // If empty, use the full chatData without making an API request
        setFilteredData(chatData);
        return;
      }
      console.log("Query:", value, "Column Key:", columnKey); 
      const response = await axios.get("/search", {
        params: {
          query: value,
          columnKey: columnKey,
        },
      });
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error in search:", error);
      message.error("Error while searching.");
    }
  };
  const dataToDisplay = searchQuery ? filteredData : chatData;

  const columns = [
    {
      title: "Prénom",
      key: "request_lastname",
      dataIndex: "request_lastname",
      render: (text, record) => (
        <div
          className="cursor-pointer"
          onClick={() => handleCoachClick(record)}
        >
          <div>{record.request_lastname || "-"}</div>
         
        </div>
      ),
    },
    {
      title: "Nom",
      key: "request_name",
      dataIndex: "request_name",
      render: (text, record) => (
        <div
          className="cursor-pointer"
          onClick={() => handleCoachClick(record)}
        >
          <div>{record.request_name || "-"}</div>
         
        </div>
      ),
    },
 
    {
      title: "Email",
      key: "request_email" || "request_add_email",
      dataIndex: "request_email" || "request_add_email",
      render: (text, record) => (
        <div
          className="cursor-pointer"
          onClick={() => handleCoachClick(record)}
        >
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
      title: "Status",
      dataIndex: "course_details",
      key: "course_details",
      render: (text, record) => text || record.request_who || "-",
    },
    {
      title: "Besoin",
      dataIndex: "student",
      key: "student",
      render: (text, record) =>
        text || record.information_request || "-",
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
      title: "Contacter",
      dataIndex: "choose_course",
      key: "choose_course",
      render: (text, record) => (
        <div className="text-gray-500 text-xs">
          {record.initial ||
            "-"}
          ,
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


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, 1000); // Show spinner after 1 second

    // Cleanup timer if component unmounts
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fakeLoad = setTimeout(() => {
      setLoading(false);
    }, 3000); // Replace with actual loading duration

    return () => clearTimeout(fakeLoad);
  }, []);

  if (loading && showSpinner) return <Spin tip="Loading..." />;

  if (error)
    return <Alert message="Error" description={error} type="error" showIcon />;
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedLeads(selectedRowKeys);
    },
    selectedRowKeys: selectedLeads,
  };

  return (
    <div className=" bg-gray-50 h-full mb-6 rounded-md">
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

      <div className="bg-white rounded-lg shadow-md p-4">
        <Table
          dataSource={dataToDisplay.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )}
          columns={[
            ...columns.map((col) => ({
              ...col,
              title: (
                <div className="flex flex-col items-center">
                  <div className="text-xs">{col.title}</div>
                  {col.key !== "action" && (
                    <Input
                      placeholder={`${col.title}`}
                      onChange={(e) => handleColumnSearch(e, col.key)}
                      className="mt-2"
                      size="medium"
                      style={{ width: "120%" }}
                      placeholderStyle={{ fontSize: "2px" }}
               
                    />
                  )}
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
      </div>
    </div>
  );
};

export default Leads;
