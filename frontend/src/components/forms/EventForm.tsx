import { useState, ChangeEvent, FormEvent } from "react";
import { EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface Props {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

export default function EventForm({ initialData, submitText, onSubmit }: Props) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSubmit(data);
    }
  }

  return (
    <form className="etkinlik-formu" onSubmit={handleSubmit} noValidate>
      <div className="form-grubu">
        <label htmlFor="title">Etkinlik Adı</label>
        <input 
          id="title" name="title" type="text"
          value={data.title} onChange={handleChange}
          aria-invalid={errors.title ? true : undefined} 
        />
        {errors.title && <span className="hata-metni">{errors.title}</span>}
      </div>

      <div className="form-grubu">
        <label htmlFor="category">Kategori</label>
        <select 
          id="category" name="category" 
          value={data.category} onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
        >
          <option value="">Seçiniz</option>
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Yarışma">Yarışma</option>
          <option value="Diğer">Diğer</option>
        </select>
        {errors.category && <span className="hata-metni">{errors.category}</span>}
      </div>

      <div className="form-ikili">
        <div className="form-grubu">
          <label htmlFor="date">Tarih</label>
          <input 
            id="date" name="date" type="date"
            value={data.date} onChange={handleChange}
            aria-invalid={errors.date ? true : undefined}
          />
          {errors.date && <span className="hata-metni">{errors.date}</span>}
        </div>
        <div className="form-grubu">
          <label htmlFor="time">Saat</label>
          <input 
            id="time" name="time" type="time"
            value={data.time} onChange={handleChange}
            aria-invalid={errors.time ? true : undefined}
          />
          {errors.time && <span className="hata-metni">{errors.time}</span>}
        </div>
      </div>

      <div className="form-grubu">
        <label htmlFor="location">Yer</label>
        <input 
          id="location" name="location" type="text"
          value={data.location} onChange={handleChange}
          aria-invalid={errors.location ? true : undefined}
        />
        {errors.location && <span className="hata-metni">{errors.location}</span>}
      </div>

      <div className="form-grubu">
        <label htmlFor="capacity">Kontenjan (Kişi)</label>
        <input 
          id="capacity" name="capacity" type="number"
          value={data.capacity} onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined}
        />
        {errors.capacity && <span className="hata-metni">{errors.capacity}</span>}
      </div>

      <div className="form-grubu">
        <label htmlFor="description">Açıklama</label>
        <textarea 
          id="description" name="description" rows={4}
          value={data.description} onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
        />
        {errors.description && <span className="hata-metni">{errors.description}</span>}
      </div>

      <div className="form-aksiyonlar">
        <button type="submit" className="buton">{submitText}</button>
      </div>
    </form>
  );
}
