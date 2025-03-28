import classes from "./EventItem.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

function EventItem(props) {
  const { event } = props;

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = event.location.replace(", ", "\n");
  const link = `/events/${event.id}`;

  return (
    <li className={classes.item}>
      <img src={"/" + event.image} alt={event.title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{event.title}</h2>
          <div className={classes.date}>
            <HiMiniCalendarDateRange />
            <time>{formattedDate}</time>
          </div>
          <div className={classes.address}>
            <FaLocationDot />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Link href={link}>Explore event</Link>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
