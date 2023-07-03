# Project Title

A brief description of your project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Installation

1. Clone the repository.

   ```shell
   git clone https://github.com/your-username/your-project.git
   ```

2. Install the dependencies.
   ```shell
   cd your-project
   yarn install
   ```

## Usage

Start the development server and open the project in your browser.

```shell
yarn dev
```

Access the application where vite informs.

## Features

- Fetches data from REST PokeAPI https://pokeapi.co/;
- Displays suggestions of Pokemon names while user types in the search bar;
- Allows navigation by using keyboard's TAB key;
- Autocompletes the query in the search bar when user clicks on the suggestion or hits ENTER;
- Takes into consideration user's system color scheme (light/dark) to apply CSS;
- Clears the query in the search bar when users tap on CLEAR button.

## Technical considerations

- REST API doesn't allow filtering. In this way, app fetches only the first 150 pokemon names (first generation) and filters them locally, which is not optimal as we have to handle O(n) in the front-end.
