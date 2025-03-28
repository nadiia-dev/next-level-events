"use client";
import { useParams } from "next/navigation";
import EventSummary from "@/components/event-detail/EventSummary";
import EventLogistics from "@/components/event-detail/EventLogistics";
import EventContent from "@/components/event-detail/EventContent";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { useEffect, useState } from "react";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [curEvent, setCurEvent] = useState();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`/api/events/${eventId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await res.json();
        setCurEvent(data);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchEvents();
  }, []);

  if (!curEvent) {
    return (
      <ErrorAlert>
        <p>Could not find event</p>
      </ErrorAlert>
    );
  }
  return (
    <>
      <EventSummary title={curEvent.title} />
      <EventLogistics
        date={curEvent.date}
        address={curEvent.location}
        image={curEvent.image}
        imageAlt={curEvent.title}
      />
      <EventContent>
        <p>{curEvent.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;
