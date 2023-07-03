# Possible improvements

1. Move where we fetch the pokémons to where it's needed
   We are using a custom hook to manage the pokemon fetching, giving us loading, error and data. Even though the API looks nice, we're lifting the state up from where it was supposed to be.
   That will make the "host" component re-render.

2. Decouple the clear button from <SearchBar /> and make the search compositable
   Clear button lives inside the SearchBar. That forces the consumer to pass props so the clear button can clear the query and close the SuggestionBox. That makes the interface messier and blocks the consumer to pass a different node to be used as clear button.
