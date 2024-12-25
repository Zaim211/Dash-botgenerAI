

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CalendarEvents = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams(); // Assuming leadId is part of the route parameter

  useEffect(() => {
    // Fetch events related to the lead
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/events/${id}`); // Make sure the URL is correct

        console.log("Fetched Event:", response.data);

        if (response.data) {
          setEvent(response.data); // Directly set the event data as it's a single object
        } else {
          console.log("No event found for this lead");
          setEvent(null); // Set to null if no event is found
        }
      } catch (error) {
        console.error("Error fetching the event:", error);
      }
    };

    fetchEvent();
  }, [id]); // Add `id` as a dependency to refetch if it changes

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
