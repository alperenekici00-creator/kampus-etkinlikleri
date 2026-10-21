interface EventFormProps {
  onSubmit: () => void;
}

export default function EventForm({ onSubmit }: EventFormProps) {
  return (
    <section>
      <p className="form-not">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <p><label htmlFor="title">Etkinlik Adı</label><input id="title" name="title" type="text" maxLength={80} placeholder="Örn: Kariyer Günleri 2026" /></p>
        <p><label htmlFor="category">Kategori</label>
          <select id="category" name="category" defaultValue="">
            <option value="">Seçiniz</option><option value="Seminer">Seminer</option><option value="Atölye">Atölye</option><option value="Söyleşi">Söyleşi</option><option value="Yarışma">Yarışma</option>
          </select>
        </p>
        <p><label htmlFor="date">Tarih</label><input id="date" name="date" type="date" /></p>
        <p><label htmlFor="time">Saat</label><input id="time" name="time" type="time" /></p>
        <p><label htmlFor="location">Yer</label><input id="location" name="location" type="text" placeholder="Örn: A Blok Konferans Salonu" /></p>
        <p><label htmlFor="capacity">Kontenjan</label><input id="capacity" name="capacity" type="number" min={1} /></p>
        <p><label htmlFor="description">Açıklama</label><textarea id="description" name="description" rows={5} /></p>
        <p><button type="submit">Kaydet</button></p>
      </form>
    </section>
  );
}