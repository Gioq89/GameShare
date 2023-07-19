// handles the sign up form input to create user
var signupFormHandler = async (event) => {
  event.preventDefault();

  // gathers the username and password input and trims excess blank space
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  let validUsername;
  let validEmail;
  let validPassword;

  if (!username || username.length < 5) {
    $('.username-error').text(
      'Please enter a username longer than 5 characters!',
    );
    validUsername = undefined;
  } else {
    validUsername = username;
  }

  if (!email || email.length < 5) {
    $('.email-error').text('Please enter a valid email!');
    validEmail = undefined;
  } else {
    validEmail = email;
  }

  if (!password || password.length < 6) {
    $('.password-error').text(
      'Please enter a valid password (greater than 6 characters)!',
    );
    validPassword = undefined;
  } else {
    validPassword = password;
  }

  // if a username, email and password were input
  // store the new user
  if (validUsername && validEmail && validPassword) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // if the username/email/password are saved, redirect user to the homepage after creating a new session for them
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      $('.signup-error').text(
        'Failed to sign up! Username/email may exist already or email is invalid. Please try logging in!',
      );
    }
  }
};

// event listeners for getting form information once submit is clicked
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
