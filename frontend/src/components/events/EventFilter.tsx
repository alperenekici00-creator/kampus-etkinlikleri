import { Category } from "../../types/campus-event";

interface Props {
  searchText: string;
  onSearchChange: (text: string) => void;
  category: Category | "Tümü";
  onCategoryChange: (category: Category | "Tümü") => void;
  categories: Category[];
}

export default function EventFilter({ searchText, onSearchChange, category, onCategoryChange, categories }: Props) {
  return (
    <div className="filter-bar">
      <div className="arama-grubu">
        <label htmlFor="search">Etkinlik ara</label>
        <input
          id="search"
          type="text"
          placeholder="Örn: atölye, kariyer"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="arama-grubu">
        <label htmlFor="category">Kategori</label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | "Tümü")}
        >
          <option value="Tümü">Tümü</option>
          {categories.filter(c => c !== "").map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
