// handles searching a game by title
const searchTitleHandler = async (event) => {
  event.preventDefault();

  // gathers the input to be searched
  const search = document.querySelector('#title').value.trim();

  // if the user enters a title
  if (search) {
    // send a get request to fetch any game that contains the user's title request
    const response = await fetch(`/api/games/${search}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    // if post data goes through, redirect the user to a new page showing the search results
    if (response.ok) {
      // user must enter more than 3 characters (there are too many games that the search crashes if the user only types in 1 letter (like a or s))
      if (search.length >= 3) {
        const results = await response.json();
        // only get the id, title, and thumbnail of the results (to shorten query)
        const game_info = results.map((result) => ({
          id: result.id,
          game_title: result.game_title,
          game_thumbnail: result.game_thumbnail,
        }));

        // encodes the the results query for req.query in order to pass it to the handlebars route
        // encodeURIComponent will encode the string of results (i.e converts any spaces, &, ! symbols)
        const games = JSON.stringify(game_info);
        const results_query = encodeURIComponent(games);
        document.location.replace(
          `/dashboard/search/${search}?results=${results_query}`,
        );
      } else {
        alert('Please enter at least 3 characters for a sufficient search!');
      }
    } else {
      alert('No games found with that name! Please try again.');
    }
  }
};

// event listeners for getting form information once submit is clicked
document
  .querySelector('.title-form')
  .addEventListener('submit', searchTitleHandler);
