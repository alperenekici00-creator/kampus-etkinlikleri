import { useState, useEffect } from "react";
import "./App.css";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";
function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  let title = "Kampüs Etkinlikleri";
  let subtitle = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";

  if (page === "events") {
    title = "Tüm Etkinlikler";
    subtitle = "Ekim ayında kampüste düzenlenen etkinlikler.";
  } else if (page === "detail") {
    title = selected ? selected.title : "Etkinlik Bulunamadı";
    subtitle = "";
  } else if (page === "add") {
    title = "Etkinlik Ekle";
    subtitle = "";
  } else if (page === "update") {
    title = "Etkinlik Güncelle";
    subtitle = "";
  }
  useEffect(() => {
    document.title = page === "home" ? "Kampüs Etkinlikleri" : `Kampüs Etkinlikleri — ${title}`;
  }, [page, title]);

  return (
    <>
      <div className="site-baslik">
        <Header title={title} text={subtitle} />
        <Navigation current={page} onNavigate={(p) => go(p)} />
      </div>
      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <button type="button" onClick={() => go("events")}>Tüm etkinlikleri gör</button>
          </section>
        )}
        {page === "events" && (
          <section>
            <EventFilter
              searchText={searchText} onSearchChange={setSearchText}
              category={category} onCategoryChange={setCategory}
              categories={categories} resultCount={filtered.length}
            />
            <EventList events={filtered} onShowDetail={(id) => go("detail", id)} emptyText="Eşleşen etkinlik bulunamadı." />
          </section>
        )}
        {page === "detail" && !selected && (
          <div className="hata-kutusu">
            <p>Aradığınız etkinlik bulunamadı.</p>
            <button type="button" onClick={() => go("events")}>← Listeye dön</button>
          </div>
        )}
        {page === "detail" && selected && (
          <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        )}
        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>
      <Footer />
    </>
  );
}
export default App;