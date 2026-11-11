# Backend API

REST API tabanlı Express.js sunucusu.

## Kurulum
```bash
npm install
```

## Çalıştırma
Geliştirme modu (değişiklikleri izler):
```bash
npm run dev
```

Normal başlatma:
```bash
npm start
```

## REST Sözleşmesi (Endpointler)
Sunucu adresi: `http://localhost:3000`

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| GET | `/events` | Listeyi getir | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Hata formatı:**
```json
{ "error": { "message": "Event not found" } }
```
