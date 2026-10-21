import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export default function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay">
      <div>
        {event.image && (
          <figure>
            <img src={event.image} alt={`${event.title} afişi`} />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        )}
        <h2>Açıklama</h2>
        <p>{event.description}</p>
        <div className="detay-aksiyonlar">
          <button type="button" onClick={onBack}>← Listeye dön</button>
          <button type="button" onClick={() => onEdit(event.id)}>Bu etkinliği güncelle</button>
        </div>
      </div>

      <aside className="kunye-kutu">
        <h2>Etkinlik Künyesi</h2>
        <dl>
          <dt>Tarih</dt>
          <dd>
            <time dateTime={event.date}>{formatDate(event.date)}, {event.time}</time>
          </dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </aside>
    </article>
  );
}