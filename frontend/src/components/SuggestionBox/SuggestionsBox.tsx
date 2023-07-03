import { useEffect } from "react";
import { useFetchPokemonSuggestions } from "../../data/useFetchPokemonSuggestions";
import { capitalizeFirstLetter } from "../../utils";
import "./SuggestionBox.css";

interface Props {
  query: string;
  open: boolean;
  loading?: boolean;
  handleItemClick: (selectedItem: string) => void;
}

export function SuggestionsBox({ query, open, handleItemClick }: Props) {
  const {
    isLoading,
    data: items,
    error,
    fetch: pokemonFetch,
  } = useFetchPokemonSuggestions();

  useEffect(() => {
    const dataFetch = async () => {
      await pokemonFetch(query);
    };
    if (query !== "") {
      dataFetch();
    }
  }, [query]);

  if (query === "" || !open) {
    return null;
  }

  const suggestionItems =
    items.length === 0 ? (
      <p>No results</p>
    ) : (
      items.map((pokemon) => {
        const matchedLetters = pokemon.name.slice(0, query.length);
        const remainingLetters = pokemon.name.slice(query.length);
        return (
          <li
            tabIndex={0}
            className="SuggestionItem"
            key={pokemon.url}
            onClick={(event) =>
              handleItemClick(event.currentTarget.textContent || "")
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleItemClick(event.currentTarget.textContent || "");
              }
            }}
          >
            <mark>{capitalizeFirstLetter(matchedLetters)}</mark>
            {remainingLetters}
          </li>
        );
      })
    );

  return (
    <ul className="SuggestionBox">
      {isLoading ? <p>Loading...</p> : suggestionItems}
      {error && (
        <p>☹️ Our system isn't available right now. Please try again later</p>
      )}
    </ul>
  );
}
