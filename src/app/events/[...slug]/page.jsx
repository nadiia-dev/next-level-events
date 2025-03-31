import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/ResultsTitle";
import ErrorAlert from "@/components/ui/ErrorAlert";
import Button from "@/components/ui/Button";

const fetchEvents = async (numYear, numMonth) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${numYear}/${numMonth}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }
    return res.json();
  } catch (e) {
    console.error(e.message);
  }
};

const FilteredEvents = async ({ params }) => {
  const slug = await params.slug;

  if (!slug) {
    return <p className="center">Loading...</p>;
  }

  const year = slug[0];
  const month = slug[1];

  const numYear = +year;
  const numMonth = +month;

  if (
    isNaN(numMonth) ||
    isNaN(numYear) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }
  const filteredEvents = await fetchEvents(numYear, numMonth);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for this filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }
  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {filteredEvents && (
        <>
          <ResultsTitle date={date} />
          <EventList items={filteredEvents} />
        </>
      )}
    </>
  );
};

export default FilteredEvents;
