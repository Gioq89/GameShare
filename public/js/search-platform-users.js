// handles searching users by platform
const searchPlatformHandler = async (event) => {
  event.preventDefault();

  // gathers the input to be searched
  const search = document.querySelector('#user-platform').value.trim();

  // if the user chooses a platform
  if (search) {
    // send a get request to fetch any users that play on that platform
    const response = await fetch(`/api/users/platform/${search}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    // if post data goes through, redirect the user to a new page showing the search results
    if (response.ok) {
      const results = await response.json();
      // only get the username and platform of users
      const user_info = results.map((result) => ({
        username: result.username,
        preferredPlatform: result.preferred_platform,
      }));

      if (user_info.length > 0) {
        // need to encode the the results query for req.query in order to pass it to the handlebars route
        // encodeURIComponent will encode the string of results (i.e converts any spaces, &, ! symbols)
        const users = JSON.stringify(user_info);
        const results_query = encodeURIComponent(users);
        document.location.replace(
          `/connect/search/${search}?results=${results_query}`,
        );
      } else {
        alert('No users found playing on that platform! Please search again');
      }
    } else {
      alert('Unable to search! Please try again.');
    }
  }
};

// event listeners for getting form information once submit is clicked
document
  .querySelector('.platform-form')
  .addEventListener('submit', searchPlatformHandler);
