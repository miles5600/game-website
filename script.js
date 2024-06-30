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
  