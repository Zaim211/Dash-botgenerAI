import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const LeadDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await axios.get(`/lead/${id}`);
        setLead(response.data.chat);
        setFormData(response.data.chat); // Initialize form data with fetched lead details
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

  const handleSave = async () => {
    try {
      const chatId = formData.id;

      const response = await axios.put(`/lead/${id}`, formData);

      if (response.status === 200) {
        // Handle successful save
        alert("Changes saved successfully!");
        setLead(formData); // Refetch the lead details after saving changes
        setIsModalOpen(false); // Close the modal after saving changes
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Error saving changes, please try again.");
    }
  };

  if (!lead) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
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
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Informations Lead
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <p className="text-gray-600 font-semibold">Nom:</p>
              <p className="text-gray-800 font-semibold">
                {lead.request_name || "-"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-600 font-semibold">Email:</p>
              <p className="text-gray-800 font-semibold">
                {lead.request_email || "-"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-600 font-semibold">Téléphone:</p>
              <p className="text-gray-800 font-semibold">
                {lead.request_phone || "-"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-600 font-semibold">Niveau d'Étude:</p>
              <p className="text-gray-800 font-semibold">
                {lead.course_details || lead.employee_training || "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Additional Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <p className="text-gray-600 font-semibold">Campus:</p>
              <p className="text-gray-800 font-semibold">
                {lead.student || lead.salarie_details || lead.découvrir || "-"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-600 font-semibold">Speciality:</p>
              <p className="text-gray-800 font-semibold">
                {lead.program_interest ||
                  lead.employee_training ||
                  lead.choose_course ||
                  lead.choose_course_salarie ||
                  "-"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-600 font-semibold">Duration:</p>
              <p className="text-gray-800 font-semibold">
                {lead.duration || lead.training_details || "-"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-600 font-semibold">Status:</p>
              <p className="text-gray-800 font-semibold">
                {lead.remmberme || lead.not_talk || "-"}
              </p>
            </div>
          </div>
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
                    Niveau d'Étude
                  </label>
                  <input
                    type="text"
                    name="course_details"
                    value={
                      formData.course_details ||
                      formData.employee_training ||
                      "-"
                    }
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter Education Level"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-lg font-medium text-gray-700">
                    Campus
                  </label>
                  <input
                    type="text"
                    name="student"
                    value={
                      formData.student ||
                      formData.salarie_details ||
                      formData.découvrir ||
                      "-"
                    }
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter Campus Name"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-lg font-medium text-gray-700">
                    Speciality
                  </label>
                  <input
                    type="text"
                    name="program_interest"
                    value={
                      formData.program_interest ||
                      formData.employee_training ||
                      formData.choose_course ||
                      formData.choose_course_salarie ||
                      "-"
                    }
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter Lead's Speciality"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-lg font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={
                      formData.duration || formData.training_details || "-"
                    }
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter Duration"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-lg font-medium text-gray-700">
                    Status
                  </label>
                  <input
                    type="text"
                    name="remmberme"
                    value={formData.remmberme || formData.not_talk || "-"}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter Status"
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
