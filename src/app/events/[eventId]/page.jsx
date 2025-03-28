"use client";
import { useParams } from "next/navigation";
import { getEventById } from "../../../../dummy-data";
import EventSummary from "@/components/event-detail/EventSummary";
import EventLogistics from "@/components/event-detail/EventLogistics";
import EventContent from "@/components/event-detail/EventContent";
import ErrorAlert from "@/components/ui/ErrorAlert";

const EventDetailPage = () => {
  const { eventId } = useParams();

  const curEvent = getEventById(eventId);

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
