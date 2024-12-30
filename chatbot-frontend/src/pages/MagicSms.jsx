// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Spin, Table, Alert, Select, Button } from "antd";
// import { MailOutlined, MessageOutlined } from "@ant-design/icons";

// const MagicSms = () => {
//   const [chatData, setChatData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [showSpinner, setShowSpinner] = useState(false);
//   const [selectedLeads, setSelectedLeads] = useState([]);
//   const [smsSentStatus, setSmsSentStatus] = useState({});
//   const [emailSentStatus, setEmailSentStatus] = useState({});

//   const handleSendSms = async (request_phone) => {
//     if (!request_phone) {
//       setError('Phone number is required.');
//       return;
//     }
  
//     const message = "Hello! This is your predefined message."; // Or, you can allow the user to input a message
  
//     setLoading(true);
//     setError(null);
  
//     try {
//       const response = await axios.post('/send-sms', { request_phone, message }); // Send both phone and message
  
//       if (response.data.success) {
//         alert('Message sent successfully!');
//         setSmsSentStatus((prev) => ({
//           ...prev,
//           [request_phone]: true, // Mark this phone as sent
//         }));
//       }
//     } catch (err) {
//       setError('Failed to send message');
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handlePageChange = (value) => {
//     setCurrentPage(value);
//   };
//   const totalPages = Math.ceil(chatData.length / pageSize);

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const response = await axios.get("/data");
//         console.log("Fetched data:", response.data);
//         setChatData(response.data.chatData);
//       } catch (err) {
//         setError("Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUserData();
//   }, []);

//   const handleSendEmail = async (request_email) => {
//     if (!request_email) {
//       setError("Email is required.");
//       return;
//     }
//     console.log("Email:", request_email);

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post("/send-email", { request_email }); // Send email and message

//       if (response.data.success) {
//         alert("Email sent successfully!");
//         setEmailSentStatus((prev) => ({
//           ...prev,
//           [request_email]: true, // Mark this email as sent
//         }));
//       }
//     } catch (err) {
//       setError("Failed to send email");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const columns = [
//     {
//       title: "Prénom",
//       key: "request_lastname",
//       dataIndex: "request_lastname",
//       render: (text, record) => (
//         <div
//           className="cursor-pointer"
//           onClick={() => handleCoachClick(record)}
//         >
//           <div>{record.request_lastname || "-"}</div>
         
//         </div>
//       ),
//     },
//     {
//       title: "Nom",
//       key: "request_name",
//       dataIndex: "request_name",
//       render: (text, record) => (
//         <div
//           className="cursor-pointer"
//           onClick={() => handleCoachClick(record)}
//         >
//           <div>{record.request_name || "-"}</div>
         
//         </div>
//       ),
//     },
 
//     {
//       title: "Email",
//       key: "request_email" || "request_add_email",
//       dataIndex: "request_email" || "request_add_email",
//       render: (text, record) => (
//         <div
//           className="cursor-pointer"
//           onClick={() => handleCoachClick(record)}
//         >
//          <div className="text-gray-500 text-xs">
//             {record.verification_email === "Non"
//               ? record.request_add_email || "-"
//               : record.request_email || "-"}
//           </div>
         
//         </div>
//       ),
//     },
//     {
//       title: "DATE",
//       dataIndex: "createdAt",
//       key: "createdAt",
//       render: (date) => {
//         if (!date) return "-";
//         const formattedDate = new Date(date);
//         const day = formattedDate.toLocaleDateString("en-GB");
//         const time = formattedDate.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//         return (
//           <div
//             className="cursor-pointer"
//             onClick={() => handleCoachClick(record)}
//           >
//             <div>{day}</div>
//             <div className="text-gray-500 text-sm">{time}</div>
//           </div>
//         );
//       },
//     },
//     {
//       title: "TELEPHONE",
//       dataIndex: "request_phone",
//       key: "request_phone",
//       render: (text) => text || "-",
//     },
//     {
//       title: "Status",
//       dataIndex: "course_details",
//       key: "course_details",
//       render: (text, record) => text || record.request_who || "-",
//     },
//     {
//       title: "SMS",
//       key: "send_sms",
//       render: (_, record) => (
//         <Button
//           type="primary"
//           icon={<MessageOutlined />}
//           onClick={() => handleSendSms(record.request_phone)}
//           style={{
//             backgroundColor: smsSentStatus[record._id] ? "green" : "blue",
//             borderColor: smsSentStatus[record._id] ? "green" : "blue",
//             cursor: smsSentStatus[record._id] ? "not-allowed" : "pointer",
//           }}
//           disabled={smsSentStatus[record._id]} // Disable if SMS already sent
//         >
//           {smsSentStatus[record._id] ? "Sent" : "SMS"}
//         </Button>
//       ),
//       responsive: ['sm', 'md'],
//     },
//     {
//       title: "Email",
//       key: "send_email",
//       render: (_, record) => (
//         <Button
//           type="primary"
//           icon={<MailOutlined style={{
//             color: emailSentStatus[record.request_email] ? "white" : "white",
//           }}/>} // Adding the email icon
//           onClick={() => handleSendEmail(record.request_email)}
//           style={{
//             backgroundColor: emailSentStatus[record.request_email] ? "green" : "blue",
//             borderColor: emailSentStatus[record.request_email] ? "green" : "blue",
//             cursor: emailSentStatus[record.request_email] ? "not-allowed" : "pointer",
//           }}
//           disabled={emailSentStatus[record.request_email]}
//         >
//           {emailSentStatus[record.request_email] ? "Sent" : "Email"}
//         </Button>
//       ),
//       responsive: ['sm', 'md'],
//     },
//   ];

//   if (loading && showSpinner) return <Spin tip="Loading..." />;

//   if (error)
//     return <Alert message="Error" description={error} type="error" showIcon />;
//   const rowSelection = {
//     onChange: (selectedRowKeys) => {
//       setSelectedLeads(selectedRowKeys);
//     },
//     selectedRowKeys: selectedLeads,
//   };

//   return (
//     <div className=" bg-gray-50 h-full mb-6 rounded-md">
//       <div className="mb-4 p-4 flex items-center rounded-md gap-4">
//         <span className="font-thin text-gray-600">Afficher</span>
//         <Select
//           defaultValue={1}
//           onChange={handlePageChange}
//           className="w-20 border-gray-300"
//         >
//           {[...Array(totalPages)].map((_, index) => (
//             <Option key={index + 1} value={index + 1}>
//               {index + 1}
//             </Option>
//           ))}
//         </Select>

//         <span className="font-thin text-gray-600">résultats par page</span>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-4">
//         <Table
//           dataSource={chatData.slice(
//             (currentPage - 1) * pageSize,
//             currentPage * pageSize
//           )}
//           columns={[
//             ...columns.map((col) => ({
//               ...col,
//               title: (
//                 <div className="flex flex-col items-center">
//                   <div className="text-xs">{col.title}</div>
//                 </div>
//               ),
//             })),
//           ]}
//           rowKey={(record) => record._id}
//           pagination={false}
//           bordered
//           className="custom-table"
//           rowSelection={rowSelection}
//           tableLayout="fixed"
//         />
//       </div>
//     </div>
//   );
// };

// export default MagicSms;





import React, { useState } from 'react';
import axios from 'axios';

const SMS_conversationnel = () => {
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSendSMS = async () => {
    // Clear previous response
    setResponse(null);

    if (!to || !message) {
      setResponse({ success: false, message: "Phone number and message are required." });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('/send-sms', { request_phone: to, message });
      if (res.data.success) {
        setResponse({ success: true, message: 'SMS sent successfully!' });
      } else {
        setResponse({ success: false, message: res.data.error });
      }
    } catch (error) {
      setResponse({ success: false, message: error.response ? error.response.data.error : 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          SMS Conversationnel
        </h1>

        <div className="mb-4">
          <label
            htmlFor="to"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Recipient's Phone Number
          </label>
          <input
            id="to"
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter phone number"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Type your message here"
            rows="4"
          ></textarea>
        </div>

        <button
          onClick={handleSendSMS}
          disabled={loading}
          className={`w-full py-2 rounded-lg shadow ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white focus:ring-2 focus:ring-blue-400 focus:outline-none`}
        >
          {loading ? 'Sending...' : 'Send SMS'}
        </button>

        {response && (
          <div
            className={`mt-4 p-4 text-sm rounded-lg ${
              response.success
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {response.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SMS_conversationnel;
