"use client";
import EventList from "@/components/events/EventList";
import { useParams } from "next/navigation";
import ResultsTitle from "@/components/events/ResultsTitle";
import ErrorAlert from "@/components/ui/ErrorAlert";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";

const FilteredEvents = () => {
  const { slug } = useParams();
  const [filteredEvents, setFilteredEvents] = useState();
  const [error, setError] = useState();

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

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`/api/events/${numYear}/${numMonth}`);
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await res.json();
        setFilteredEvents(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchEvents();
  }, []);

  if (error) {
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
