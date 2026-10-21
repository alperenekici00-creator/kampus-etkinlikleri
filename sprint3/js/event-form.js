import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesajKutusu = document.querySelector("#form-mesaj");

if (form) {
    const isUpdate = form.dataset.mode === "guncelle";
    const id = new URLSearchParams(location.search).get("id");
    let currentEvent = null;

    if (isUpdate) {
        currentEvent = events.find(e => e.id === id);
        if (!currentEvent) {
            form.outerHTML = `
                <div style="background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 8px; border: 1px solid #f5c6cb; margin-bottom: 1rem;">
                    Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.
                </div>
                <a href="etkinlikler.html" style="display: inline-block; background: var(--renk-ana); color: white; padding: 0.5rem 1rem; text-decoration: none; border-radius: 4px;">Etkinliklere git</a>
            `;
        } else {
            form.elements.ad.value = currentEvent.title;
            form.elements.kategori.value = currentEvent.category;
            form.elements.tarih.value = currentEvent.date;
            form.elements.saat.value = currentEvent.time;
            form.elements.yer.value = currentEvent.location;
            form.elements.kontenjan.value = currentEvent.capacity;
            form.elements.aciklama.value = currentEvent.description;
        }
    }

    if (document.querySelector("#etkinlik-formu")) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            form.querySelectorAll("input, select, textarea").forEach(el => el.removeAttribute("aria-invalid"));
            form.querySelectorAll(".hata-metni").forEach(el => el.textContent = "");
            mesajKutusu.innerHTML = "";

            const fd = new FormData(form);
            const data = {
                id: isUpdate ? id : `event-${Date.now()}`,
                title: fd.get("ad").trim(),
                category: fd.get("kategori"),
                date: fd.get("tarih"),
                time: fd.get("saat"),
                location: fd.get("yer").trim(),
                capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
                description: fd.get("aciklama").trim()
            };

            const errors = {};

            if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
            if (!data.category) errors.kategori = "Bir kategori seçin.";
            if (!data.date) errors.tarih = "Tarih seçin.";
            if (!data.time) errors.saat = "Saat seçin.";
            if (!data.location) errors.yer = "Yer bilgisini yazın.";
            if (data.capacity !== null && (data.capacity < 1 || data.capacity > 1000)) errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";

            if (Object.keys(errors).length > 0) {
                for (const [key, msg] of Object.entries(errors)) {
                    const input = form.elements[key];
                    if (input) {
                        input.setAttribute("aria-invalid", "true");
                        const errorSpan = document.querySelector(`#${key}-hata`);
                        if (errorSpan) errorSpan.textContent = msg;
                    }
                }
                return;
            }

            mesajKutusu.innerHTML = `
                <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 8px; border: 1px solid #c3e6cb; margin-top: 1rem;">
                    <p style="font-weight: bold; margin-bottom: 0.5rem;">Etkinlik ${isUpdate ? 'güncellendi' : 'oluşturuldu'} (bu sprintte kaydedilmez):</p>
                    <pre style="margin: 0; font-family: monospace; font-size: 0.9rem;">${JSON.stringify(data, null, 2)}</pre>
                </div>
            `;
        });
    }
}