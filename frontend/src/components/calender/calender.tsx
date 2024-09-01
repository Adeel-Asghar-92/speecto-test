import "react-big-calendar/lib/css/react-big-calendar.css";
import "tailwindcss/tailwind.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { IEvent } from "../../interfaces/book"; // Assuming Event interface is defined in a separate file

interface CalendarProps {
  events: IEvent[];
  onSelectSlot: (slotInfo: { start: Date; end: Date }) => void;
  onSelectEvent: (event: any) => void;
}

const CalendarComponent: React.FC<CalendarProps> = ({
  events,
  onSelectSlot,
  onSelectEvent,
}) => {
  const localizer = momentLocalizer(moment);
  console.log("eventsevents", events);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      onSelectSlot={onSelectSlot}
      onSelectEvent={onSelectEvent}
      style={{ height: 500 }}
      selectable
      views={["month"]}
    />
  );
};

export default CalendarComponent;
