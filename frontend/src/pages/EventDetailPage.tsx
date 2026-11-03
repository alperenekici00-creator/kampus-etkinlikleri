import { useParams, Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import NotFoundPage from "./NotFoundPage";
import EventDetail from "../components/events/EventDetail";

export default function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();
  const event = events.find(e => e.id === (id ?? ""));
  
  if (!event) return <NotFoundPage />;
  
  return (
    <>
      <h2 className="bolum-baslik">{event.title}</h2>
      <EventDetail event={event} />
      <div className="form-aksiyonlar" style={{ marginTop: '2rem' }}>
        <Link to="/events" className="buton buton-outline">&larr; Listeye dön</Link>
      </div>
    </>
  );
}
