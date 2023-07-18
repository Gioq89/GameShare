// handles searching a game by genre
const searchCategoryHandler = async (event) => {
  event.preventDefault();

  // gathers the input to be searched
  const search = document.querySelector('#game-genre').value.trim();

  // if the user chooses a genre
  if (search) {
    // send a get request to fetch any game that is a part of that genre
    const response = await fetch(`/api/games/freetogame/category/${search}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    // if post data goes through, redirect the user to a new page showing the search results
    if (response.ok) {
      const results = await response.json();
      // only get the id, title, and thumbnail of the results (to shorten query)
      const game_info = results.map((result) => ({
        id: result.id,
        game_thumbnail: result.thumbnail,
      }));

      // need to encode the the results query for req.query in order to pass it to the handlebars route
      // encodeURIComponent will encode the string of results (i.e converts any spaces, &, ! symbols)
      const games = JSON.stringify(game_info);
      const results_query = encodeURIComponent(games);
      document.location.replace(
        `/dashboard/search/${search}?results=${results_query}`,
      );
    } else {
      alert('No games found under that category! Please search again.');
    }
  }
};

// event listeners for getting form information once submit is clicked
document
  .querySelector('.genre-form')
  .addEventListener('submit', searchCategoryHandler);
