import React, { useState, useEffect, useMemo } from "react";
import { IEvent } from "../../interfaces/book";
import dayjs from "dayjs";
import { loadEvents } from "../calender/actions";
import EventModal from "./EventModal";
import { handleDelete, handleSubmit } from "../../actions/events";

const Event: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // New state for loading
  const [showModal, setShowModal] = useState(false);
  const [editedEvent, setEditedEvent] = useState<IEvent>(defaultEvent);

  useEffect(() => {
    loadEvents(setEvents);
    setIsLoading(false); // Set loading to false after fetching
  }, []);

  const filteredEvents = useMemo(() => {
    if (events.length > 0) {
      return events.filter((event) => {
        const start = dayjs(event.start).format("YYYY-MM-DD");
        const end = dayjs(event.end).format("YYYY-MM-DD");

        const dateMatches = dateRange.every((date, index) => {
          if (date === null) return true; // If no date is selected, it's considered a match
          const date1 = dayjs(date).format("YYYY-MM-DD");
          // Corrected logic: Check if the event's start and end dates fall within the selected date range
          return (
            (index === 0 && start >= date1) || (index === 1 && end <= date1)
          );
        });
        return dateMatches;
      });
    } else return [];
  }, [events, dateRange]);

  const handleDateChange = (index: number, date: Date | null) => {
    setDateRange((prevDateRange) => {
      const newDateRange = [...prevDateRange];
      newDateRange[index] = date;
      return [newDateRange[0], newDateRange[1]];
    });
  };

  const handleEdit = async (event: IEvent) => {
    setShowModal(true);
    setEditedEvent(event);
  };

  const handleSubmitWrapper = async () => {
    const success = await handleSubmit(editedEvent, events, setEvents);
    if (success) {
      setShowModal(false);
    }
  };

  const handleDeleteWrapper = async (id: string | null) => {
    const success = await handleDelete(id, setEvents);
    if (success) {
      setShowModal(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedEvent((prevState) => ({ ...prevState, [name]: value.toString() }));
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Events</h1>
      <p className="text-lg mb-8">
        Select a date range to view and manage events.
      </p>
      <div className="flex items-center mb-4">
        <input
          type="date"
          value={dateRange[0] ? dateRange[0].toISOString().split("T")[0] : ""}
          onChange={(e) =>
            handleDateChange(
              0,
              e.target.value ? new Date(e.target.value) : null
            )
          }
          className="w-full p-2 mr-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={dateRange[1] ? dateRange[1].toISOString().split("T")[0] : ""}
          onChange={(e) =>
            handleDateChange(
              1,
              e.target.value ? new Date(e.target.value) : null
            )
          }
          className="w-full p-2 ml-2 border border-gray-300 rounded"
        />
      </div>
      {isLoading ? (
        <div>Loading...</div> // Display loading message
      ) : filteredEvents.length > 0 ? (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Start</th>
              <th className="px-4 py-2">End</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event._id}>
                <td className="border px-4 py-2">{event.title}</td>
                <td className="border px-4 py-2">
                  {dayjs(event?.start).format("DD-MMM-YYYY")}
                </td>
                <td className="border px-4 py-2">
                  {dayjs(event?.end).format("DD-MMM-YYYY")}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteWrapper(event._id!)}
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No Record Found</div>
      )}

      <EventModal
        isOpen={showModal}
        event={editedEvent}
        changeHandler={handleChange}
        onClose={handleCancel}
        onSubmit={handleSubmitWrapper}
        onDelete={() => handleDeleteWrapper(editedEvent._id)}
      />
    </div>
  );
};

export default Event;

const defaultEvent: IEvent = {
  _id: null,
  title: "",
  start: new Date(),
  end: new Date(),
  description: "",
  price: "0",
};
