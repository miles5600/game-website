document.addEventListener("DOMContentLoaded", function () {
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

  // Example function to load games (replace with your actual game loading logic)
  function loadGames() {
    // Example code to load games
    const games = [
      { title: "Game 1", url: "game1.swf" },
      { title: "Game 2", url: "game2.swf" }
    ];

    const flashGamesContainer = document.querySelector('#flash-games .game-list');
    games.forEach(game => {
      const gameItem = document.createElement('div');
      gameItem.classList.add('game-item');
      gameItem.innerHTML = `<h3>${game.title}</
