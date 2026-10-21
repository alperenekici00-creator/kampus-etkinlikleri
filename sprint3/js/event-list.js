import { events } from "./data.js";

function createCard(event) {
    const dateObj = new Date(event.date);
    const formattedDate = dateObj.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });
    
    return `<article class="kart">
        <img src="${event.image || 'Afis.png'}" alt="${event.title} afişi" style="width: 100%; border-radius: 8px; margin-bottom: 15px; aspect-ratio: 4/3; object-fit: cover; display: block;">
        <h3 style="margin-top: 0;">${event.title}</h3>
        <p class="kategori-badge"><strong>${event.category}</strong></p>
        <p>Tarih: ${formattedDate}, ${event.time}</p>
        <p>Yer: ${event.location}</p>
        <p>Kontenjan: ${event.capacity ? event.capacity + ' kişi' : 'Belirtilmemiş'}</p>
        <p>${event.description}</p>
        <br>
        <a href="etkinlik-detay.html?id=${event.id}">Detayları gör &rarr;</a>
    </article>`;
}

const list = document.querySelector("#etkinlik-listesi");

function render(dizi) {
    list.innerHTML = dizi.map(createCard).join(""); 
}

if (list) {
    if (list.dataset.limit) {
        const yaklasan = [...events]
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, Number(list.dataset.limit));
        render(yaklasan);
    } else {
        render(events);

        const searchInput = document.querySelector("#arama");
        const siralaBtn = document.querySelector("#sirala-az-btn");
        const sonucSatiri = document.querySelector("#sonuc");

        let aktifDizi = [...events]; // Üzerinde filtre/sıralama yapılacak aktif liste

        function guncelle() {
            const aranan = searchInput ? searchInput.value.toLocaleLowerCase("tr-TR") : "";

            aktifDizi = events.filter((e) => {
                return e.title.toLocaleLowerCase("tr-TR").includes(aranan) || 
                       e.description.toLocaleLowerCase("tr-TR").includes(aranan) ||
                       e.location.toLocaleLowerCase("tr-TR").includes(aranan);
            });

            if (aktifDizi.length === 0) {
                list.innerHTML = "";
                sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
            } else {
                render(aktifDizi);
                sonucSatiri.textContent = `${aktifDizi.length} etkinlik listeleniyor.`;
            }
        }

        if (searchInput) {
            searchInput.addEventListener("input", guncelle);
        }

        // A'dan Z'ye Sırala butonuna basıldığında çalışacak fonksiyon
        if (siralaBtn) {
            siralaBtn.addEventListener("click", () => {
                aktifDizi.sort((a, b) => a.title.localeCompare(b.title, 'tr'));
                render(aktifDizi);
                sonucSatiri.textContent = `${aktifDizi.length} etkinlik A'dan Z'ye sıralandı.`;
            });
        }
        
        const form = document.querySelector("#filtre-formu");
        if (form) {
            form.addEventListener("submit", (e) => e.preventDefault());
        }

        sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;
    }
}