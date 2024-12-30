

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const CalendarEvents = () => {
//   const [event, setEvent] = useState(null);
//   const { id } = useParams(); // Assuming leadId is part of the route parameter

//   useEffect(() => {
//     // Fetch events related to the lead
//     const fetchEvent = async () => {
//       try {
//         const response = await axios.get(`/events/${id}`); // Make sure the URL is correct

//         console.log("Fetched Event:", response.data);

//         if (response.data) {
//           setEvent(response.data); // Directly set the event data as it's a single object
//         } else {
//           console.log("No event found for this lead");
//           setEvent(null); // Set to null if no event is found
//         }
//       } catch (error) {
//         console.error("Error fetching the event:", error);
//       }
//     };

//     fetchEvent();
//   }, [id]); // Add `id` as a dependency to refetch if it changes

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//       {/* Title */}
//       <h2 className="text-3xl font-bold text-gray-800 mb-8">
//         Planning Récemment Ajouté
//       </h2>

//       {/* Event Card */}
//       {event ? (
//         <div className="bg-white border border-gray-200 shadow-md rounded-lg p-8 max-w-md w-full hover:shadow-lg transition-shadow duration-300">
//           <p className="text-lg font-semibold text-gray-700 mb-4">
//             <span className="font-bold text-gray-900">Date:</span> {event.event_date}
//           </p>
//           <p className="text-lg font-semibold text-gray-700 mb-4">
//             <span className="font-bold text-gray-900">Heure:</span> {event.event_time}
//           </p>
//           <p className="text-lg font-semibold text-gray-700 mb-4">
//             <span className="font-bold text-gray-900">Objectif:</span> {event.objective}
//           </p>
//           <p className="text-lg font-semibold text-gray-700">
//             <span className="font-bold text-gray-900">Commentaire:</span> {event.comment}
//           </p>
//         </div>
//       ) : (
//         <p className="text-center text-gray-600 text-lg">Aucun événement trouvé.</p>
//       )}
//     </div>
//   );
// };

// export default CalendarEvents;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import { useParams } from "react-router-dom";

const CalendarEvents = () => {
  const [leadsEvents, setLeadsEvents] = useState({}); // Store events grouped by lead ID
  const {id} = useParams(); // Get leadId from URL

  useEffect(() => {
    // Fetch all events from the server
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/events/${id}`); // Fetch all events
        console.log("Fetched Events:", response.data);

        // Group events by lead ID
        const groupedEvents = response.data.reduce((acc, event) => {
          const leadId = event.lead;
          if (!acc[leadId]) {
            acc[leadId] = [];
          }
          acc[leadId].push({ ...event, key: event._id }); // Add key for Ant Design table
          return acc;
        }, {});

        setLeadsEvents(groupedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Define table columns
  const columns = [
    {
      title: "Date",
      dataIndex: "event_date",
      key: "event_date",
    },
    {
      title: "Heure",
      dataIndex: "event_time",
      key: "event_time",
    },
    {
      title: "Objectif",
      dataIndex: "objective",
      key: "objective",
    },
    {
      title: "Commentaire",
      dataIndex: "comment",
      key: "comment",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Calendrier des Événements
      </h2>

      {/* Render a table for each lead */}
      {Object.keys(leadsEvents).length > 0 ? (
        Object.entries(leadsEvents).map(([leadId, events]) => (
          <div
            key={leadId}
            className="bg-white border border-gray-200 shadow-md rounded-lg p-4 mb-8"
          >
            <Table columns={columns} dataSource={events} pagination={false} />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 text-lg">
          Aucun événement trouvé.
        </p>
      )}
    </div>
  );
};

export default CalendarEvents;
