import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Spin,
  Table,
  Alert,
  Select,
  Input as AntdInput,
  Button,
  Popconfirm,
  Space,
  message,
  Input,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  SearchOutlined,
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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/lead/${id}`)

      console.log("Chat deleted successfully:", response.data);
      setChatData(chatData.filter((lead) => lead._id !== id)); 
      message.success("Coach deleted successfully");
    } catch (error) {
      console.error("Error deleting coach:", error);
      message.error("Failed to delete coach");
    }
  }


  // Define table columns with NOM and EMAIL integrated
  const columns = [
    {
      title: "NOM",
      key: "request_name",
      render: (text, record) => (
        <div className="cursor-pointer"
        onClick={() => handleCoachClick(record)}>
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
          <div className="cursor-pointer"
          onClick={() => handleCoachClick(record)}>
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
          defaultValue="nouveau"
          style={{ width: 80 }}
          onChange={(value) => handleStatusLeadChange(value, record)}
        >
          <Option value="nouveau">Nouveau</Option>
          <Option value="prospect">Prospect</Option>
          <Option value="validé">Client</Option>
        </Select>
      ),
    },
    {
      title: "SPECIALITY",
      dataIndex: "choose_course",
      key: "choose_course",
      render: (text, record) => (
        <div className="text-gray-500 text-xs">
       { record.program_interest ||
        record.employee_training ||
        record.choose_course ||
        record.choose_course_salarie ||
        "-"},
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
      key: "status",
      render: (text, record) => record.remmberme || record.not_talk || "-",
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

  // Mock loading completion (replace with actual loading logic)
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
  const handleColumnSearch = (e, columnKey) => {
    const value = e.target.value.toLowerCase();
    const filteredData = chatData.filter(record => {
      // Check if the column value contains the search input
      return record[columnKey]?.toString().toLowerCase().includes(value);
    });
    setFilteredData(filteredData); 
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

{/*        
        <Button type="primary" className="text-lg justify-end flex font-semibold px-4 py-5">
          Extraction via Email
        </Button> */}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <Table
          // columns={columns}
          dataSource={chatData.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )}
          columns={[
            ...columns.map(col => ({
              ...col,
              title: (
                <div className="flex flex-col items-center">
            <div className="text-xs">{col.title}</div>
            {/* Search Input under each column */}
            {col.key !== "action" && (
              <Input
                placeholder={`${col.title}`}
                // prefix={<SearchOutlined />}
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
