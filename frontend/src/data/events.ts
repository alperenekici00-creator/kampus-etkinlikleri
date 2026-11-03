import { CampusEvent } from "../types/campus-event";

export const initialEvents: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    capacity: 100,
    description: "Mezunlarla kariyer söyleşileri ve şirket standları."
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "2026-10-20",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    capacity: 20,
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi."
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "2026-10-27",
    time: "13:00",
    location: "B Blok Amfi 1",
    capacity: 50,
    description: "Sektörden bir uzmanla güvenlik kariyeri üzerine sohbet."
  },
  {
    id: "event-4",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "2026-11-03",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    capacity: 30,
    description: "HTML ve CSS ile ilk kişisel sayfanı yap."
  },
  {
    id: "event-5",
    title: "Kodlama Yarışması",
    category: "Yarışma",
    date: "2026-11-10",
    time: "09:30",
    location: "Kütüphane Etkinlik Alanı",
    capacity: 10,
    description: "Üç kişilik takımlarla dört saatlik algoritma yarışması."
  },
  {
    id: "event-6",
    title: "Yapay Zekâ Semineri",
    category: "Seminer",
    date: "2026-11-17",
    time: "14:30",
    location: "A Blok Konferans Salonu",
    capacity: 50,
    description: "Büyük dil modelleri nasıl çalışır? Temel kavramlar ve örnekler."
  }
];
