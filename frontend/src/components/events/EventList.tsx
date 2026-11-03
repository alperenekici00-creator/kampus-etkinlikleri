import { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface Props {
  events: CampusEvent[];
}

export default function EventList({ events }: Props) {
  if (events.length === 0) {
    return <p>Henüz etkinlik bulunmuyor.</p>;
  }
  return (
    <div className="event-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
