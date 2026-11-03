import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { EventFormData } from "../types/campus-event";
import EventForm from "../components/forms/EventForm";

export default function AddEventPage() {
  const emptyForm: EventFormData = {
    title: "", category: "", date: "", time: "", location: "", capacity: "", description: ""
  };
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <div className="auth-sayfasi">
      <EventForm 
        initialData={emptyForm}
        submitText="Kaydet"
        onSubmit={(data) => {
          addEvent(data);
          navigate("/admin");
        }}
      />
    </div>
  );
}
