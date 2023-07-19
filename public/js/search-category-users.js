// handles searching users by genre
const searchCategoryHandler = async (event) => {
  event.preventDefault();

  // gathers the input to be searched
  const search = document.querySelector('#user-genre').value.trim();

  // if the user chooses a genre
  if (search) {
    // send a get request to fetch any users that are interested in that genre
    const response = await fetch(`/api/users/genre/${search}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    // if post data goes through, redirect the user to a new page showing the search results
    if (response.ok) {
      const results = await response.json();
      // only get the username and genre of the user
      const user_info = results.map((result) => ({
        username: result.username,
        interestedGenre: result.interestedGenre,
      }));

      // checks if there are any users interested in that genre; if not, return error
      if (user_info.length > 0) {
        // need to encode the the results query for req.query in order to pass it to the handlebars route
        // encodeURIComponent will encode the string of results (i.e converts any spaces, &, ! symbols)
        const users = JSON.stringify(user_info);
        const results_query = encodeURIComponent(users);
        document.location.replace(
          `/connect/search/${search}?results=${results_query}`,
        );
      } else {
        $('#error').text(
          'No users found with that genre interest! Please search again',
        );
      }
    } else {
      alert('Unable to search! Please try again.');
    }
  }
};

// event listeners for getting form information once submit is clicked
document
  .querySelector('.genre-form')
  .addEventListener('submit', searchCategoryHandler);
