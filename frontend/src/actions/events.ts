import axios from "axios";
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "../services/bookService";
import { toastError, toastSuccess } from "../utils/toast";
import { IEvent } from "../interfaces/book";

export const getEvents = async (setEvents: any) => {
  await axios({
    method: "get",
    url: "http://localhost:5000/api/event/get",
  })
    .then(({ data }: any) => {
      setEvents(data.data);
    })
    .catch((err) => {});
};

export const handleSubmit = async (
  editedEvent: IEvent,
  events: IEvent[],
  setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>
): Promise<boolean> => {
  try {
    if (editedEvent._id) {
      const updatedEvent = await updateEvent(editedEvent);

      const newEvents = events.map((e) =>
        e._id === updatedEvent._id ? { ...e, ...updatedEvent } : e
      );
      setEvents(newEvents);
      toastSuccess("Event updated successfully");
      return true;
    } else {
      const createdEvent = await createEvent(editedEvent);
      setEvents(createdEvent);
      // setEvents((prevEvents) => [...prevEvents, createdEvent]);
      toastSuccess("Event created successfully");
      return true;
    }
  } catch (error) {
    toastError("Failed to save event");
    return false;
  }
};

export const handleDelete = async (
  id: string | null,
  setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>
) => {
  try {
    if (id) {
      await deleteEvent(id);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
      toastSuccess("Event deleted successfully");
      return true;
    }
  } catch (error) {
    toastError("Failed to delete event");
    return false;
  }
};
