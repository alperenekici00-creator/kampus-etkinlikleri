import { createContext, useContext, useState, ReactNode } from "react";
import { CampusEvent, EventFormData, Category } from "../types/campus-event";
import { initialEvents } from "../data/events";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(data: EventFormData) {
    setEvents([...events, toEvent(`event-${Date.now()}`, data)]);
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents(events.map((e) => (e.id === id ? toEvent(id, data) : e)));
  }

  function deleteEvent(id: string) {
    setEvents(events.filter((e) => e.id !== id));
  }

  function toEvent(id: string, data: EventFormData): CampusEvent {
    return {
      id,
      title: data.title.trim(),
      category: data.category as Category,
      capacity: Number(data.capacity),
      date: data.date,
      time: data.time,
      location: data.location,
      description: data.description.trim()
    };
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const value = useContext(EventsContext);
  if (value === null) throw new Error("Provider yok");
  return value;
}
