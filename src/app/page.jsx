import EventList from "@/components/events/EventList";

async function getFeaturedEvents() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/featured`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

async function HomePage() {
  const featuredEvents = await getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;
