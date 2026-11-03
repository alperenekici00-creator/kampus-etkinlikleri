import { Link } from "react-router-dom";
import { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface Props {
  event: CampusEvent;
}

export default function EventCard({ event }: Props) {
  return (
    <article className="event-card">
      <h3>{event.title}</h3>
      <div className="event-kategori">
        <span className="etiket">{event.category}</span>
      </div>
      <p className="tarih">Tarih: {formatDate(event.date)}, {event.time}</p>
      <p className="yer">Yer: {event.location}</p>
      <p className="kontenjan">Kontenjan: {event.capacity} kişi</p>
      <p className="aciklama-kisa">{event.description}</p>
      <Link to={`/events/${event.id}`} className="detay-link">Detayları gör</Link>
    </article>
  );
}
