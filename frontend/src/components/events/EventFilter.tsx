import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  category: Category | "";
  onCategoryChange: (category: Category | "") => void;
  categories: Category[];
  resultCount: number;
}

export default function EventFilter({
  searchText, onSearchChange, category, onCategoryChange, categories, resultCount
}: EventFilterProps) {
  return (
    <>
      <div className="filtre-panel">
        <p>
          <label htmlFor="search">Etkinlik ara</label>
          <input
            id="search"
            type="search"
            placeholder="Örn: atölye, kariyer"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="categoryFilter">Kategori</label>
          <select
            id="categoryFilter"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as Category | "")}
          >
            <option value="">Tümü</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </p>
      </div>

      <p className="sonuc-bilgi">
        {resultCount === 0
          ? "Eşleşen etkinlik bulunamadı."
          : `${resultCount} etkinlik listeleniyor.`}
      </p>
    </>
  );
}