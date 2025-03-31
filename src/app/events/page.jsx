import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";

export const metadata = {
  title: "All Events",
  description: "Find a lot of great events that allow you to evolve...",
};

const EventsList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`);

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const events = await res.json();

  return (
    <div>
      <EventSearch />
      <EventList items={events} />
    </div>
  );
};

export default EventsList;
