"use client";
import EventList from "@/components/events/EventList";
import { getAllEvents } from "../../../dummy-data";
import EventSearch from "@/components/events/EventSearch";
import { useRouter } from "next/navigation";

const EventsList = () => {
  const events = getAllEvents();
  const router = useRouter();

  const searchHandler = (year, month) => {
    const path = `/events/${year}/${month}`;

    router.push(path);
  };

  return (
    <div>
      <EventSearch onSearch={searchHandler} />
      <EventList items={events} />
    </div>
  );
};

export default EventsList;
