"use client";
import EventList from "@/components/events/EventList";
import { useParams } from "next/navigation";
import { getFilteredEvents } from "../../../../dummy-data";

const FilteredEvents = () => {
  const { slug } = useParams();

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
    return <p className="center">Invalid filter</p>;
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for this filter</p>;
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
};

export default FilteredEvents;
