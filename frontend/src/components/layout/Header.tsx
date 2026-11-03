import { Link, useLocation } from "react-router-dom";
import Navigation from "./Navigation";

export default function Header() {
  const location = useLocation();

  let title = "Kampüs Etkinlikleri";
  let subtitle = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";

  if (location.pathname === "/events") {
    title = "Tüm Etkinlikler";
    subtitle = "Ekim ayında kampüste düzenlenen etkinlikler.";
  } else if (location.pathname === "/admin") {
    title = "Etkinlik Yönetimi";
    subtitle = "";
  } else if (location.pathname === "/admin/new") {
    title = "Etkinlik Ekle";
    subtitle = "";
  } else if (location.pathname.includes("/edit")) {
    title = "Etkinliği Güncelle";
    subtitle = "";
  } else if (location.pathname === "/login") {
    title = "Giriş Yap";
    subtitle = "";
  } else if (location.pathname === "/register") {
    title = "Kayıt Ol";
    subtitle = "";
  } else if (location.pathname === "/forgot-password") {
    title = "Şifremi Unuttum";
    subtitle = "";
  } else if (location.pathname !== "/" && !location.pathname.startsWith("/events/")) {
    title = "Sayfa Bulunamadı";
    subtitle = "";
  }

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <h1>{title}</h1>
        </Link>
        {subtitle && <p>{subtitle}</p>}
        <Navigation />
      </div>
    </header>
  );
}
