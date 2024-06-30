// Firebase configuration
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

const flashGamesContainer = document.querySelector('#flash-games .game-list');
const cdGamesContainer = document.querySelector('#cd-games .game-list');

function loadGames() {
  db.collection('flashGames').get().then(snapshot => {
    snapshot.forEach(doc => {
      const game = doc.data();
      const gameItem = document.createElement('div');
      gameItem.classList.add('game-item');
      gameItem.innerHTML = `<h3>${game.title}</h3><a href="${game.url}" target="_blank">Play Now</a>`;
      flashGamesContainer.appendChild(gameItem);
    });
  });

  db.collection('cdGames').get().then(snapshot => {
    snapshot.forEach(doc => {
      const game = doc.data();
      const gameItem = document.createElement('div');
      gameItem.classList.add('game-item');
      gameItem.innerHTML = `<h3>${game.title}</h3><a href="${game.url}" download>Download</a>`;
      cdGamesContainer.appendChild(gameItem);
    });
  });
}

loadGames();
