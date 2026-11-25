# Kampüs Etkinlikleri - Backend (Sprint 9)

## REST Sözleşmesi

| Method | Endpoint | Başarılı | Hata |
|---|---|---|---|
| GET | /health | 200 | |
| GET | /events?search=&category= | 200 | |
| GET | /events/upcoming | 200 tarihe göre sıralı | |
| GET | /events/:id | 200 | 404 |
| POST | /events | 201 | 400 |
| PATCH | /events/:id | 200 güncel kayıt | 400, 404 |
| DELETE| /events/:id | 204 gövde yok | 404 |
