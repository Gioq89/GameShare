// handles editing the user's profile
var editProfileHandler = async (event) => {
  // prevents the browser from sending the form by default so it can instead be rendered by the code below
  event.preventDefault();

  // gathers the form's contents
  const genre = document.querySelector('#genre').value.trim();
  const platform = document.querySelector('#platform').value.trim();
  const aboutme = document.querySelector('#about-me').value.trim();
  const username = document.querySelector('#username').value;

  // as long as there is some sort of update to the form
  if (genre && platform && aboutme) {
    // send the updated profile data to the post route
    const response = await fetch(`/api/users/${username}`, {
      method: 'PUT',
      body: JSON.stringify({ genre, platform, aboutme }),
      headers: { 'Content-Type': 'application/json' },
    });

    // if update data goes through, replace the current page with the updated profile
    if (response.ok) {
      document.location.replace(`/profile`);
    } else {
      alert('Failed to update profile');
    }
  }
};

document
  .querySelector('.editProfile-form')
  .addEventListener('submit', editProfileHandler);
