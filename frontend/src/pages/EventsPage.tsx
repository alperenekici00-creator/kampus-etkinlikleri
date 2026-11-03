import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import { Category } from "../types/campus-event";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "Tümü">("Tümü");
  
  const categories = [...new Set(events.map((e) => e.category))] as Category[];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <EventFilter 
        searchText={searchText} onSearchChange={setSearchText}
        category={category} onCategoryChange={setCategory as (cat: Category | "Tümü") => void}
        categories={categories}
      />
      <p style={{ color: '#558b2f', fontWeight: 'bold', marginBottom: '1rem' }}>
        {filtered.length} etkinlik listeleniyor.
      </p>
      <EventList events={filtered} />
    </>
  );
}
