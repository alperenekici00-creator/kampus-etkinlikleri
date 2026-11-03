import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

export default function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <>
      <h2 className="bolum-baslik">Yaklaşan {upcoming.length} Etkinlik</h2>
      <EventList events={upcoming} />
      <div style={{ marginTop: '1.5rem' }}>
        <Link className="buton" to="/events">Tüm etkinlikleri gör</Link>
      </div>
    </>
  );
}
