document.addEventListener("DOMContentLoaded", function () {
  const db = firebase.firestore();
  const body = document.body;
  const darkModeToggle = document.getElementById("toggle-dark-mode");

  // Check for saved user preference in localStorage
  const savedMode = localStorage.getItem("dark-mode");
  if (savedMode) {
    body.classList.add(savedMode);
  } else {
    body.classList.add("light-mode"); // Default to light mode
  }

  // Function to toggle dark mode
  darkModeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      body.classList.replace("dark-mode", "light-mode");
      localStorage.setItem("dark-mode", "light-mode");
    } else {
      body.classList.replace("light-mode", "dark-mode");
      localStorage.setItem("dark-mode", "dark-mode");
    }
  });

  function loadGames() {
    db.collection('flashGames').get().then(snapshot => {
      snapshot.forEach(doc => {
        const game = doc.data();
        const gameItem = document.createElement('div');
        gameItem.classList.add('game-item');
        gameItem.innerHTML = `<h3>${game.title}</h3><a href="${game.url}" target="_blank">Play Now</a>`;
        document.querySelector('#flash-games .game-list').appendChild(gameItem);
      });
    });

    db.collection('cdGames').get().then(snapshot => {
      snapshot.forEach(doc => {
        const game = doc.data();
        const gameItem = document.createElement('div');
        gameItem.classList.add('game-item');
        gameItem.innerHTML = `<h3>${game.title}</h3><a href="${game.url}" download>Download</a>`;
        document.querySelector('#cd-games .game-list').appendChild(gameItem);
      });
    });
  }

  loadGames();
});
