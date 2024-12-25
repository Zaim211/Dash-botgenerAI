import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Tabs,
  Button,
  Input,
  Form,
  Calendar,
  Row,
  Col,
} from "antd";
import { jwtDecode } from "jwt-decode";
import { DeleteOutlined } from "@ant-design/icons";
import CalendarEvents from "../components/CalendarEvents";
import Command from "../components/Command";
import Panier from "./Panier";

const { TabPane } = Tabs;

const LeadDetailsPage = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("1");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("token");
  const [selectedDate, setSelectedDate] = useState(null);


  const onDateSelect = (date) => {
    setSelectedDate(date);
    form.setFieldsValue({
      event_date: date.format("YYYY-MM-DD"), // Set selected date in the form field
    });
  };

  const handleFormSubmit = async (values) => {
    try {
      // Send values to your backend API to add a new lead
      const response = await axios.post("/data", values);
      console.log("Lead added successfully:", response.data);
      // Handle successful submission, e.g., show a success message or reset form
    } catch (error) {
      console.error("Error adding lead:", error);
      // Handle error (e.g., show error message)
    }
  };



  const handleFormSubmitCalendar = async (values) => {
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    console.log("Decoded Token:", decodedToken);
    if (!decodedToken) {
      alert("User not authenticated");
      return;
    }

    // Use userId as adminId (based on the decoded token)
    const adminId = decodedToken.userId; // Use userId here

    const eventData = {
      ...values, // This includes event_date, event_time, objective, and comment
      admin: adminId, // Add the userId as the admin field
      leadId: id, // Add the leadId to the event
    };

    try {
      const response = await axios.post("/events", eventData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for backend validation if needed
        },
      });
      console.log("Event added successfully:", response.data);
      // Handle successful submission
    } catch (error) {
      console.error("Error adding event:", error);
      // Handle error
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    // navigate(key === "2" ? `/lead/${id}/commentaires` : `/lead/${id}`);
  };

  useEffect(() => {
    // Set the active tab based on the route
    if (window.location.pathname.includes("commentaires")) {
      setActiveTab("2");
    } else {
      setActiveTab("1");
    }
  }, [window.location.pathname]);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await axios.get(`/lead/${id}`);
        setLead(response.data.chat);
        console.log("Lead Details:", response.data.chat);
        setComments(response.data.chat.commentaires || []);
        setFormData(response.data.chat);
      } catch (error) {
        console.error("Error fetching lead details:", error);
      }
    };

    fetchLead();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return alert("Comment cannot be empty!");

    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    console.log("Decoded Token:", decodedToken);
    if (!decodedToken) {
      alert("User not authenticated");
      return;
    }

    try {
      const response = await axios.put(
        `/add-comment/${id}`,
        {
          text: newComment,
          name: decodedToken.name, // Send the name
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for backend validation if needed
          },
        }
      );
      console.log("Sending comment:", {
        text: newComment,
        name: decodedToken.name, // This should match the expected structure
      });

      if (response.status === 200) {
        alert("Comment added successfully!");
        setComments(response.data.commentaires); // Update comments list
        setNewComment(""); // Clear input field
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Could not add comment, please try again.");
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`/lead/${id}`, formData);
      if (response.status === 200) {
        alert("Changes saved successfully!");
        setLead(formData);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Error saving changes, please try again.");
    }
  };

  if (!lead) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `/lead/${id}/delete-comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Comment deleted successfully!");
        setComments(comments.filter((comment) => comment._id !== commentId)); // Update comments list by removing the deleted comment
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Could not delete comment, please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-2">
      {/* Page Title */}
      <div className="flex-1 mb-12">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Details Lead
        </h1>
        <div className="flex justify-center mb-4">
          <span className="px-4 py-2 bg-purple-900 text-white font-bold rounded-full">
            {lead.request_name}
          </span>
        </div>
      </div>

      {/* Two Boxes Side by Side */}
      <div className="flex justify-between space-x-4">
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Informations" key="1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column (Informations Leads) */}
                <div className="space-y-4 mt-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Informations Leads
                  </h2>
                  {[
                    { label: "Nom", value: lead.request_name || "-" },
                    { label: "Prénom", value: lead.request_lastname || "-" },
                    { label: "Email", value: lead.request_email || "-" },
                    { label: "Téléphone", value: lead.request_phone || "-" },
                    { label: "Status", value: lead.request_who || "-" },
                    { label: "Contacter", value: lead.initial || "-" },
                    { label: "Besoin", value: lead.information_request || "-" },
                    { label: "Status de lead", value: lead.type || "-" },
                  ].map(({ label, value }) => (
                    <div className="flex items-center gap-2" key={label}>
                      <p className="text-gray-600 font-semibold">{label}:</p>
                      <p className="text-gray-800 font-semibold">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Right Column (Informations Commercial) */}
                <div className="space-y-4 mt-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Informations Commercial
                  </h2>
                  {[
                    {
                      label: "Commercial prénom",
                      value: lead.commercial?.prenom || "-",
                    },
                    {
                      label: "Commercial nom",
                      value: lead.commercial?.nom || "-",
                    },
                  ].map(({ label, value }) => (
                    <div className="flex items-center gap-2" key={label}>
                      <p className="text-gray-600 font-semibold">{label}:</p>
                      <p className="text-gray-800 font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabPane>

            <TabPane tab="Commentaires" key="2">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full border rounded-lg"
                  />
                  <Button
                    type="primary"
                    onClick={handleAddComment}
                    className="bg-purple-800 text-white"
                  >
                    Submit
                  </Button>
                </div>
                <div className="mt-4">
                  {comments.length ? (
                    comments.map((comment) => (
                      <div
                        key={comment._id}
                        className="p-4 border rounded-lg mb-2 bg-gray-100"
                      >
                        <div className="flex justify-between">
                          <div>
                            <p className="text-gray-800">{comment.text}</p>
                            {/* <p className="text-gray-600 text-sm">
                              Added by: {comment.addedBy?.name || "Unknown"}
                            </p> */}
                            <p className="text-gray-600 text-sm">
                              {comment.addedAt
                                ? new Date(comment.addedAt).toLocaleString()
                                : "Unknown Date"}
                            </p>
                          </div>
                          <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteComment(comment._id)}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">
                      Aucun commentaire pour le moment.
                    </p>
                  )}
                </div>
              </div>
            </TabPane>
            <TabPane tab="Contact" key="3">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Ajouter un Lead
                </h2>

                {/* Form */}
                <Form
                  form={form}
                  onFinish={handleFormSubmit}
                  layout="vertical"
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <Form.Item
                      label="Nom"
                      name="request_name"
                      rules={[{ required: true, message: "Nom is required" }]}
                    >
                      <Input className="w-full p-2 border rounded-lg" />
                    </Form.Item>

                    <Form.Item
                      label="Prénom"
                      name="request_lastname"
                      rules={[
                        { required: true, message: "Prénom is required" },
                      ]}
                    >
                      <Input className="w-full p-2 border rounded-lg" />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="request_email"
                      rules={[
                        { required: true, message: "Email is required" },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input className="w-full p-2 border rounded-lg" />
                    </Form.Item>

                    <Form.Item
                      label="Téléphone"
                      name="request_phone"
                      rules={[
                        { required: true, message: "Téléphone is required" },
                      ]}
                    >
                      <Input className="w-full p-2 border rounded-lg" />
                    </Form.Item>

                    <Form.Item
                      label="Status"
                      name="request_who"
                      rules={[
                        { required: true, message: "Status is required" },
                      ]}
                    >
                      <Input className="w-full p-2 border rounded-lg" />
                    </Form.Item>

                    <Form.Item
                      label="Contacter"
                      name="initial"
                      rules={[
                        { required: true, message: "Contacter is required" },
                      ]}
                    >
                      <Input className="w-full p-2 border rounded-lg" />
                    </Form.Item>

                    <Form.Item
                      label="Besoin"
                      name="information_request"
                      rules={[
                        { required: true, message: "Besoin is required" },
                      ]}
                    >
                      <Input className="w-full p-2 border rounded-lg" />
                    </Form.Item>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="px-4 py-2 bg-purple-800 text-white rounded-lg"
                    >
                      Ajouter Lead
                    </Button>
                  </div>
                </Form>
              </div>
            </TabPane>
            <TabPane tab="Calendar" key="4">
              <Row gutter={24}>
                {/* Left Column for Event Details */}
                <Col span={12}>
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Ajouter un Événement
                    </h2>

                    {/* Form */}
                    <Form
                      form={form}
                      onFinish={handleFormSubmitCalendar}
                      layout="vertical"
                      className="space-y-4"
                    >
                      <Form.Item
                        label="Date"
                        name="event_date"
                        initialValue={
                          selectedDate
                            ? selectedDate.format("YYYY-MM-DD")
                            : null
                        }
                      >
                        <Input
                          readOnly
                          value={
                            selectedDate
                              ? selectedDate.format("YYYY-MM-DD")
                              : ""
                          }
                        />
                      </Form.Item>

                      <Form.Item
                        label="Heure"
                        name="event_time"
                        rules={[
                          { required: true, message: "Heure is required" },
                        ]}
                      >
                        <Input placeholder="HH:mm" />
                      </Form.Item>

                      <Form.Item
                        label="Objectif"
                        name="objective"
                        rules={[
                          { required: true, message: "Objectif is required" },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item label="Commentaire" name="comment">
                        <Input.TextArea rows={4} />
                      </Form.Item>

                      {/* Submit Button */}
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="px-4 py-2 bg-purple-800 text-white rounded-lg"
                      >
                        Ajouter Événement
                      </Button>
                    </Form>
                  </div>
                </Col>

                {/* Right Column for Calendar */}
                <Col span={12}>
                  <Calendar onSelect={onDateSelect} fullscreen={true} />
                </Col>
              </Row>{" "}
              <CalendarEvents />
            </TabPane>
            <TabPane tab="Panier" key="5">
            <div className="space-y-4">
                  <Panier />   
            </div>
            </TabPane>
            <TabPane tab="Commande" key="6">
            <div className="space-y-4">
                  <Command />   
            </div>
            </TabPane>
          </Tabs>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate("/leads")}
          className="bg-purple-800 hover:bg-purple-900 underline text-white font-semibold py-2 px-4 rounded"
        >
          Retour
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-800 hover:bg-purple-900 text-white font-semibold py-2 px-4 rounded"
        >
          Modify Lead
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 sm:w-3/4 lg:w-2/4 transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Modify Lead
            </h2>
            <div className="flex flex-col space-y-6 justify-center">
              {/* Form Fields */}
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-lg font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="request_name"
                    value={formData.request_name || ""}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter Lead's Name"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-lg font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="request_email"
                    value={formData.request_email || ""}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter Lead's Email"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-lg font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="request_phone"
                    value={formData.request_phone || ""}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter Lead's Phone"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-lg font-medium text-gray-700">
                    Prenom
                  </label>
                  <input
                    type="text"
                    name="request_lastname"
                    value={formData.request_lastname || ""}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter Lead prenom"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-lg font-medium text-gray-700">
                    Contacter
                  </label>
                  <input
                    type="text"
                    name="initial"
                    value={formData.initial || "-"}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter raison de contact"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-lg font-medium text-gray-700">
                    Besoin
                  </label>
                  <input
                    type="text"
                    name="information_request"
                    value={formData.information_request || ""}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter Lead's besoin"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-lg font-medium text-gray-700">
                    Status
                  </label>
                  <input
                    type="text"
                    name="request_who"
                    value={formData.request_who || ""}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter Campus Name"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between space-x-4 mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-3 px-6 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-purple-800 hover:bg-purple-900 text-white font-medium py-3 px-6 rounded-lg transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadDetailsPage;
