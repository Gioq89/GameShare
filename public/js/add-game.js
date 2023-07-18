// handles adding a game to a user's personal library
const addGameHandler = async (event) => {
  // prevents the browser from sending the form by default so it can instead be rendered by the code below
  event.preventDefault();

  // gathers the game's id and user's username
  const username = document.querySelector('#username').value;
  const currentGameURL = window.location.href;
  const game_id = currentGameURL.slice(currentGameURL.lastIndexOf('/') + 1);

  // if both a username and game_id are present
  if (username && game_id) {
    // send the post data to add the game to the user's library
    const response = await fetch(`/api/games/${username}/add/${game_id}`, {
      method: 'POST',
      body: JSON.stringify({ username, game_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    // if post data goes through, redirect the user to their own profile to see the game added
    if (response.ok) {
      setTimeout(function () {
        document.location.replace(`/profile`);
      }, 3000);
      $('#success').text(
        `Game successfully added to your library! Returning you to your profile..`,
      );
    } else {
      $('#error').text('This game is already in your library!');
    }
  }
};

// event listeners for getting form information once submit is clicked
document.querySelector('#add-game').addEventListener('click', addGameHandler);
