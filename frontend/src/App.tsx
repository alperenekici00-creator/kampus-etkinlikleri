import { useState, useEffect } from "react";
import "./App.css";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menuItems: { key: PageName; label: string }[] = [
  { key: "home", label: "Ana Sayfa" },
  { key: "events", label: "Etkinlikler" },
  { key: "add", label: "Ekle" },
];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
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

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <span className="kategori-rozet">{event.category}</span>
        <p>
          Tarih: <time dateTime={event.date}>{formatDate(event.date)}, {event.time}</time>
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a
          href={`#detail-${event.id}`}
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        <nav className="menu" aria-label="Ana menü">
          {menuItems.map((item) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              aria-current={page === item.key ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.key);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <div className="etkinlik-listesi">{upcoming.map(renderCard)}</div>
            <button type="button" onClick={() => go("events")}>
              Tüm etkinlikleri gör
            </button>
          </section>
        )}

        {page === "events" && (
          <section>
            <div className="filtre-panel">
              <p>
                <label htmlFor="search">Etkinlik ara</label>
                <input
                  id="search"
                  type="search"
                  placeholder="Örn: atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="categoryFilter">Kategori</label>
                <select
                  id="categoryFilter"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </p>
            </div>

            <p className="sonuc-bilgi">
              {filtered.length === 0
                ? "Eşleşen etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <div className="etkinlik-listesi">{filtered.map(renderCard)}</div>
          </section>
        )}

        {page === "detail" && !selected && (
          <div className="hata-kutusu">
            <p>Aradığınız etkinlik bulunamadı.</p>
            <button type="button" onClick={() => go("events")}>
              ← Listeye dön
            </button>
          </div>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            <div>
              {selected.image && (
                <figure>
                  <img src={selected.image} alt={`${selected.title} afişi`} />
                  <figcaption>{selected.title} afişi</figcaption>
                </figure>
              )}
              <h2>Açıklama</h2>
              <p>{selected.description}</p>
              <div className="detay-aksiyonlar">
                <button type="button" onClick={() => go("events")}>
                  ← Listeye dön
                </button>
                <button type="button" onClick={() => go("update", selected.id)}>
                  Bu etkinliği güncelle
                </button>
              </div>
            </div>

            <aside className="kunye-kutu">
              <h2>Etkinlik Künyesi</h2>
              <dl>
                <dt>Tarih</dt>
                <dd>
                  <time dateTime={selected.date}>
                    {formatDate(selected.date)}, {selected.time}
                  </time>
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>
            </aside>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <section>
            <p className="form-not">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <p>
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  maxLength={80}
                  placeholder="Örn: Kariyer Günleri 2026"
                />
              </p>

              <p>
                <label htmlFor="category">Kategori</label>
                <select id="category" name="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </p>

              <p>
                <label htmlFor="date">Tarih</label>
                <input id="date" name="date" type="date" />
              </p>

              <p>
                <label htmlFor="time">Saat</label>
                <input id="time" name="time" type="time" />
              </p>

              <p>
                <label htmlFor="location">Yer</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Örn: A Blok Konferans Salonu"
                />
              </p>

              <p>
                <label htmlFor="capacity">Kontenjan</label>
                <input id="capacity" name="capacity" type="number" min={1} />
              </p>

              <p>
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" name="description" rows={5} />
              </p>

              <p>
                <button type="submit">Kaydet</button>
              </p>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>Alperen Ekici &middot; 2321032033 &middot; 2026</p>
      </footer>
    </>
  );
}

export default App;
