import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import NotFoundPage from "./NotFoundPage";
import EventForm from "../components/forms/EventForm";

export default function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();
  
  const event = events.find(e => e.id === (id ?? ""));
  if (!event) return <NotFoundPage />;

  return (
    <div className="auth-sayfasi">
      <EventForm 
        initialData={{ ...event, capacity: String(event.capacity) }}
        submitText="Güncelle"
        onSubmit={(data) => {
          updateEvent(event.id, data);
          navigate("/admin");
        }}
      />
    </div>
  );
}
