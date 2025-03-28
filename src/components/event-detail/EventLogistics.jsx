import classes from "./EventLogistics.module.css";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import LogisticsItem from "./LogisticsItem";

function EventLogistics(props) {
  const { date, address, image, imageAlt } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <img src={`/${image}`} alt={imageAlt} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={HiMiniCalendarDateRange}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={FaLocationDot}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
