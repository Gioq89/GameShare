// handles adding a friend to a user's personal friendlist
const addFriendHandler = async (event) => {
  // prevents the browser from sending the form by default so it can instead be rendered by the code below
  event.preventDefault();

  // gathers the user's username and the other user's username who they would like to friend
  const username = document.querySelector('#your_username').value;
  const friend_username = document.querySelector('#friend_username').value;

  // if both a username and friend username are present
  if (username && friend_username) {
    // send the post data to add the friend to the user's friends list
    const response = await fetch(
      `/api/users/${username}/add/${friend_username}`,
      {
        method: 'POST',
        body: JSON.stringify({ username, friend_username }),
        headers: { 'Content-Type': 'application/json' },
      },
    );

    // if post data goes through, redirect the user to their own profile to see the game added
    if (response.ok) {
      window.location.reload();
      alert(`You have successfully connected with this user!`);
    } else if (username === friend_username) {
      alert('You cannot be friends with yourself!');
    } else {
      alert('You are already friends with this user!');
    }
  }
};

// event listeners for getting form information once submit is clicked
document
  .querySelector('#add-friend')
  .addEventListener('click', addFriendHandler);
