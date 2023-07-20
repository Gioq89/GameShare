const loginBtn = document.querySelector('#loginBtn');

const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      $('#error').text('Failed to log in!');
      // alert('Failed to log in');
    }
  }
};

// login.js
document.addEventListener("DOMContentLoaded", function () {
  const title = document.querySelector(".game-font");

  // Set initial text-stroke properties
  title.style.webkitTextStrokeWidth = "2px";
  title.style.webkitTextStrokeColor = "black";
  title.style.opacity = 0;

  // Define the animation for drawing the text
  const drawAnimation = anime({
    targets: title,
    opacity: 1,
    webkitTextStrokeWidth: 0,
    easing: "easeInOutQuad",
    duration: 2000,
    autoplay: false, // We won't play the animation right away
  });

  // Play the drawing animation
  drawAnimation.play();
});




loginBtn.addEventListener('click', loginFormHandler);
