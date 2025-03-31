import EventSummary from "@/components/event-detail/EventSummary";
import EventLogistics from "@/components/event-detail/EventLogistics";
import EventContent from "@/components/event-detail/EventContent";
import ErrorAlert from "@/components/ui/ErrorAlert";
import Comments from "@/components/input/Comments";

const fetchEvents = async (eventId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${eventId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }
  return res.json();
};

export async function generateMetadata({ params }) {
  const { eventId } = await params;

  const event = await fetchEvents(eventId);

  return {
    title: event.title,
    description: event.description,
  };
}

const EventDetailPage = async ({ params }) => {
  const eventId = await params.eventId;
  const curEvent = await fetchEvents(eventId);

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
      <Comments eventId={eventId} />
    </>
  );
};

export default EventDetailPage;
