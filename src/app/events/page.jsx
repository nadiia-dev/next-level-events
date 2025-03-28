"use client";
import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchEvents();
  }, []);

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
