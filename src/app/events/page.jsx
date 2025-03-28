import EventList from "@/components/events/EventList";
import { getAllEvents } from "../../../dummy-data";

const EventsList = () => {
  const events = getAllEvents();
  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export default EventsList;
