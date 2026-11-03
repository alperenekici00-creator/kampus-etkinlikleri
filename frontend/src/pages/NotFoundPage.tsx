import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
      <p style={{ fontSize: '1.2rem' }}>Aradığınız sayfa ya da etkinlik yok.</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/" className="buton">Ana sayfaya dön</Link>
      </div>
    </div>
  );
}
