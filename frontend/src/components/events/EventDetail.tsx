import { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface Props {
  event: CampusEvent;
}

export default function EventDetail({ event }: Props) {
  return (
    <article className="detay">
      <dl className="ozellikler">
        <div className="ozellik">
          <dt>Kategori:</dt>
          <dd><span className="etiket">{event.category}</span></dd>
        </div>
        <div className="ozellik">
          <dt>Tarih & Saat:</dt>
          <dd>{formatDate(event.date)}, {event.time}</dd>
        </div>
        <div className="ozellik">
          <dt>Yer:</dt>
          <dd>{event.location}</dd>
        </div>
        <div className="ozellik">
          <dt>Kontenjan:</dt>
          <dd>{event.capacity} kişi</dd>
        </div>
      </dl>
      <div className="aciklama">
        <p>{event.description}</p>
      </div>
    </article>
  );
}
