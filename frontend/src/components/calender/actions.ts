import { getEvents } from "../../services/bookService";
import { toastError } from "../../utils/toast";

export const loadEvents = async (setEvents: any) => {
  try {
    const fetchedEvents = await getEvents();
    setEvents(fetchedEvents);
  } catch (error) {
    toastError("Failed to fetch events");
  }
};
