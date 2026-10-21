import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

const menuItems: { key: PageName; label: string }[] = [
  { key: "home", label: "Ana Sayfa" },
  { key: "events", label: "Etkinlikler" },
  { key: "add", label: "Ekle" },
];

export default function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu" aria-label="Ana menü">
      {menuItems.map((item) => (
        <a
          key={item.key}
          href={`#${item.key}`}
          aria-current={current === item.key ? "page" : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.key);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}