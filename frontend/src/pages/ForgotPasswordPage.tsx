import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <div className="auth-sayfasi">
      <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      
      {sent && (
        <p className="mesaj mesaj-basari" style={{ marginBottom: '1rem' }}>
          Bağlantı {email} adresine gönderildi (demo).
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate className="etkinlik-formu">
        <div className="form-grubu">
          <label htmlFor="email">E-posta</label>
          <input 
            id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
          />
          {error && <span className="hata-metni">{error}</span>}
        </div>
        
        <button type="submit" className="buton" style={{ marginTop: '0.5rem' }}>Bağlantı gönder</button>
      </form>

      <div className="auth-alt-linkler">
        <Link to="/login">&larr; Girişe dön</Link>
      </div>
    </div>
  );
}
