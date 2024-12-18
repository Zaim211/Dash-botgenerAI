import React, { useState, useEffect } from "react";
import axios from "axios";

const CalendarEvents = () => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch the most recent event from the backend
    const fetchRecentEvent = async () => {
      try {
        const response = await axios.get("/events");
        const recentEvent = response.data;
        console.log("Recent Event:", recentEvent);
        setEvent(recentEvent);
      } catch (error) {
        console.error("Error fetching the recent event:", error);
      }
    };
  
    fetchRecentEvent();
  }, []);
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Planning Récemment Ajouté
      </h2>

      {/* Event Card */}
      {event ? (
        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-8 max-w-md w-full hover:shadow-lg transition-shadow duration-300">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            <span className="font-bold text-gray-900">Date:</span> {event.event_date}
          </p>
          <p className="text-lg font-semibold text-gray-700 mb-4">
            <span className="font-bold text-gray-900">Heure:</span> {event.event_time}
          </p>
          <p className="text-lg font-semibold text-gray-700 mb-4">
            <span className="font-bold text-gray-900">Objectif:</span> {event.objective}
          </p>
          <p className="text-lg font-semibold text-gray-700">
            <span className="font-bold text-gray-900">Commentaire:</span> {event.comment}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">Aucun événement trouvé.</p>
      )}
    </div>
  );
};

export default CalendarEvents;
