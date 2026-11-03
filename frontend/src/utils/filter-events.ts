import { CampusEvent, Category } from "../types/campus-event";

export function filterByCategory(events: CampusEvent[], category: Category | "Tümü"): CampusEvent[] {
  if (category === "" || category === "Tümü") return events;
  return events.filter(e => e.category === category);
}

export function searchEvents(events: CampusEvent[], text: string): CampusEvent[] {
  if (!text.trim()) return events;
  const lowerText = text.toLowerCase();
  return events.filter(e => 
    e.title.toLowerCase().includes(lowerText) || 
    e.description.toLowerCase().includes(lowerText) ||
    e.location.toLowerCase().includes(lowerText)
  );
}
