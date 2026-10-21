import { events } from "./data.js";

const container = document.querySelector("#detay");
const id = new URLSearchParams(location.search).get("id");
const event = events.find(e => e.id === id);

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

if (!event) {
    container.innerHTML = `
        <div style="background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 8px; border: 1px solid #f5c6cb; margin-bottom: 1rem;">
            "${id || 'Bilinmeyen'}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.
        </div>
        <a href="etkinlikler.html" style="display: inline-block; background: var(--renk-ana); color: white; padding: 0.5rem 1rem; text-decoration: none; border-radius: 4px;">&larr; Listeye dön</a>
    `;
} else {
    document.title = event.title;
    
    const gorsel = event.id === "event-1" ? "afis.jpg" : "sdu.png";

    container.innerHTML = `
        <figure>
            <img src="${gorsel}" alt="${event.title} görseli">
        </figure>
        <div>
            <h1>${event.title}</h1>
            <dl>
                <dt>Tarih</dt>
                <dd>${formatDate(event.date)}, ${event.time}</dd>
                <dt>Yer</dt>
                <dd>${event.location}</dd>
                <dt>Kategori</dt>
                <dd>${event.category}</dd>
                <dt>Kontenjan</dt>
                <dd>${event.capacity || 'Sınırsız'} kişi</dd>
            </dl>
            <p>${event.description}</p>
            <br>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="etkinlikler.html" style="background: var(--renk-ana); color: white; padding: 0.5rem 1rem; text-decoration: none; border-radius: 4px;">&larr; Listeye dön</a>
                <a href="etkinlik-guncelle.html?id=${event.id}" style="background: #28a745; color: white; padding: 0.5rem 1rem; text-decoration: none; border-radius: 4px;">Bu etkinliği güncelle</a>
            </div>
        </div>
    `;
}