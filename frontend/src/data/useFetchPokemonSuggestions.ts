import { useState } from "react";
import { Pokemon } from "../types";

async function GET(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}. Status: ${response.status}`);
  }
  return await response.json();
}

async function fetchPokemons() {
  const apiURL = `https://pokeapi.co/api/v2/pokemon?limit=150`;
  const response = await GET(apiURL);
  return response;
}

export function useFetchPokemonSuggestions() {
  // in a bigger app, we should move the loading state to a global state management library like redux
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Pokemon[]>([]);
  const [error, setError] = useState<Error>();
  let filterTimeout: number;

  async function fetch(query: string) {
    clearTimeout(filterTimeout);
    setIsLoading(true);
    filterTimeout = setTimeout(async () => {
      try {
        const data = await fetchPokemons();
        const pokemonSuggestions = data.results.filter((pokemon: Pokemon) => {
          return pokemon.name
            .toLocaleLowerCase()
            .startsWith(query.toLocaleLowerCase());
        });
        setData(pokemonSuggestions);
      } catch (error) {
        setError(error as Error);
      }
      setIsLoading(false);
    }, 200);
  }

  return { isLoading, data, error, fetch };
}
