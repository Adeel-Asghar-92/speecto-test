import React, { useState, useCallback, useEffect } from "react";
import CalendarComponent from "./calender";
import EventModal from "../Event/EventModal";
import { IEvent } from "../../interfaces/book";
import { loadEvents } from "./actions";
import { handleDelete, handleSubmit } from "../../actions/events";

const MyCalendar = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editedEvent, setEditedEvent] = useState<IEvent>(defaultEvent);

  useEffect(() => {
    loadEvents(setEvents);
  }, []);

  const handleSelect = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      setShowModal(true);
      setEditedEvent({ ...defaultEvent, start, end });
    },
    []
  );

  const handleEdit = (event: IEvent) => {
    setShowModal(true);
    setEditedEvent(event);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedEvent((prevState) => ({ ...prevState, [name]: value.toString() }));
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

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Calender view of events</h1>
      <p className="text-md mb-8">
        Choose dates and schedule events on the calendar.
      </p>

      <div className="flex flex-col">
        <CalendarComponent
          events={events}
          onSelectSlot={handleSelect}
          onSelectEvent={handleEdit}
        />
        <EventModal
          isOpen={showModal}
          event={editedEvent}
          changeHandler={handleChange}
          onClose={handleCancel}
          onSubmit={handleSubmitWrapper}
          onDelete={() => handleDeleteWrapper(editedEvent._id)}
        />
      </div>
    </>
  );
};

const defaultEvent: IEvent = {
  _id: null,
  title: "",
  start: new Date(),
  end: new Date(),
  description: "",
  price: "0",
};

export default MyCalendar;
