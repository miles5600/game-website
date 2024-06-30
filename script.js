document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
  
  const flashGames = [
    { title: 'Flash Game 1', url: 'games/flashgame1.swf' },
    { title: 'Flash Game 2', url: 'games/flashgame2.swf' }
  ];
  
  const cdGames = [
    { title: 'CD Game 1', url: 'downloads/cdgame1.zip' },
    { title: 'CD Game 2', url: 'downloads/cdgame2.zip' }
  ];
  
  const flashGamesContainer = document.querySelector('#flash-games .game-list');
  const cdGamesContainer = document.querySelector('#cd-games .game-list');
  
  flashGames.forEach(game => {
    const gameItem = document.createElement('div');
    gameItem.classList.add('game-item');
    gameItem.innerHTML = `<h3>${game.title}</h3><a href="${game.url}" target="_blank">Play Now</a>`;
    flashGamesContainer.appendChild(gameItem);
  });
  
  cdGames.forEach(game => {
    const gameItem = document.createElement('div');
    gameItem.classList.add('game-item');
    gameItem.innerHTML = `<h3>${game.title}</h3><a href="${game.url}" download>Download</a>`;
    cdGamesContainer.appendChild(gameItem);
  });
  // Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB9UtS740gyO8ocEMQJAdqNsQcfa5Jcv7s",
  authDomain: "my-project-testing-297611.firebaseapp.com",
  projectId: "my-project-testing-297611",
  storageBucket: "my-project-testing-297611.appspot.com",
  messagingSenderId: "401118078909",
  appId: "1:401118078909:web:ba63f0c6db5f57e87fd4d4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Example code to load games from Firestore
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
