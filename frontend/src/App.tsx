import { useState } from "react";
import "./App.css";
import { SuggestionsBox } from "./components/SuggestionBox/SuggestionsBox";
import { SearchBar } from "./components/SearchBar/SearchBar";

function App() {
  const [query, setQuery] = useState<string>("");
  const [isSuggestionBoxOpen, setIsSuggestionBoxOpen] =
    useState<boolean>(false);

  function handleSuggestionClick(selectedPokemon: string) {
    setQuery(selectedPokemon);
    setIsSuggestionBoxOpen(false);
  }

  async function handleQueryChange(query: string) {
    setQuery(query);
    setIsSuggestionBoxOpen(true);
  }

  const clearButton = query ? (
    <button
      onClick={() => {
        setQuery("");
        setIsSuggestionBoxOpen(false);
      }}
    >
      Clear
    </button>
  ) : null;

  return (
    <div>
      <h1>Search a Pokemon</h1>
      <SearchBar
        query={query}
        handleQueryChange={handleQueryChange}
        clearButton={clearButton}
      />
      <SuggestionsBox
        query={query}
        open={isSuggestionBoxOpen}
        handleItemClick={handleSuggestionClick}
      />
    </div>
  );
}

export default App;
