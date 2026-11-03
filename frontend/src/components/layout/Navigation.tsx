import { NavLink } from "react-router-dom";

export default function Navigation() {
  const menu = [
    { to: "/", label: "Ana Sayfa" },
    { to: "/events", label: "Etkinlikler" },
    { to: "/admin", label: "Yönetim" },
    { to: "/login", label: "Giriş" },
  ];

  return (
    <nav className="site-nav">
      <ul>
        {menu.map(item => (
          <li key={item.to}>
            <NavLink to={item.to} end={item.to === "/"}>{item.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
