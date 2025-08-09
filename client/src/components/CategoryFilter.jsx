export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
     <div>
      <h3>Filter by Category:</h3>
      <select value={selected} onChange={(e) => onSelect(e.target.value)}>
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}
