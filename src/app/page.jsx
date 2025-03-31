import EventList from "@/components/events/EventList";
import NewsletterRegistration from "@/components/input/NewsletterRegistration";

export const metadata = {
  title: "Next Level Events",
  description: "Find a lot of great events that allow you to evolve...",
};

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
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;
