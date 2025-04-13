import { useState } from "react";
import { toast } from "react-hot-toast";
import s from "./SearchBar.module.css"; // Make sure this matches your actual file name

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      toast.error("Please enter a search query");
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={s.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={s.searchInput}
        />
        <button type="submit" className={s.searchButton}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
