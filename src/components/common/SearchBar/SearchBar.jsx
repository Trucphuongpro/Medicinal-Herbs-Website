import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import styles from './SearchBar.module.css';

function SearchBar({ placeholder = 'Tìm kiếm dược liệu...', defaultValue = '' }) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();

    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <input
        type="search"
        className={styles.input}
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Tìm kiếm"
      />
      <button type="submit" className={styles.button} aria-label="Tìm kiếm">
        <FiSearch size={18} />
      </button>
    </form>
  );
}

export default SearchBar;
