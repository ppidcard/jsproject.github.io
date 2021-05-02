const games = new Game();
const genres = new Genre();



const searchButton = document.querySelector('#searchGame');
const searchField = document.querySelector('#gameField');
const gameList = document.querySelector('#gameList');
const gameResults = document.querySelector('#results');
const genreButtonAct = document.querySelector('.act');
const genreButtonAdv = document.querySelector('.adv');
const genreButtonRpg = document.querySelector('.rpg');
const genreButtonRac = document.querySelector('.rac');
const genreButtonStg = document.querySelector('.stg');
const genreButtonSht = document.querySelector('.sht');
const resultButtons = document.querySelector('.resultsPage');

const clearUI = () =>{
  gameResults.innerHTML = '';
  gameList.innerHTML = '';
  resultButtons.innerHTML = '';

}



genreButtonSht.addEventListener('click', e =>{

  clearUI();
  searchField.value = '';
  const query = 2;

    genres.getGames(query)
    .then(data =>{
      displayGames(data);
      resultButtons.addEventListener('click', e => {
        const btn = e.target.closest('.btn-pagination');
      
        if(btn) {
          const goToPage = parseInt(btn.dataset.goto, 10);
          clearUI();
          const query = 2;
          genres.getGames(query)
          .then(data =>{
          displayGames(data, goToPage);
        })}});
    });
  })
genreButtonStg.addEventListener('click', e =>{

  clearUI();
  searchField.value = '';
  const query = 10;

  genres.getGames(query)
    .then(data =>{
      displayGames(data);
      resultButtons.addEventListener('click', e => {
        const btn = e.target.closest('.btn-pagination');
      
        if(btn) {
          const goToPage = parseInt(btn.dataset.goto, 10);
          clearUI();
          const query = 10;
          genres.getGames(query)
          .then(data =>{
          displayGames(data, goToPage);
        })}});
    });
  })

genreButtonRac.addEventListener('click', e =>{

  clearUI();
  const query = 1;
  searchField.value = '';
  genres.getGames(query)
    .then(data =>{
      displayGames(data);
      resultButtons.addEventListener('click', e => {
        const btn = e.target.closest('.btn-pagination');
      
        if(btn) {
          const goToPage = parseInt(btn.dataset.goto, 10);
          clearUI();
          const query = 1;
          genres.getGames(query)
          .then(data =>{
          displayGames(data, goToPage);
        })}});
    });
  })
genreButtonAct.addEventListener('click', e =>{

  clearUI();
  const query = 4;
  searchField.value = '';
  genres.getGames(query)
    .then(data =>{
      displayGames(data);
      resultButtons.addEventListener('click', e => {
        const btn = e.target.closest('.btn-pagination');
      
        if(btn) {
          const goToPage = parseInt(btn.dataset.goto, 10);
          clearUI();
          const query = 4;
          genres.getGames(query)
          .then(data =>{
          displayGames(data, goToPage);
        })}});
    });
  })
  genreButtonRpg.addEventListener('click', e =>{

    clearUI();
    const query = 5;
    searchField.value = '';
    genres.getGames(query)
      .then(data =>{
        displayGames(data);
        resultButtons.addEventListener('click', e => {
          const btn = e.target.closest('.btn-pagination');
        
          if(btn) {
            const goToPage = parseInt(btn.dataset.goto, 10);
            clearUI();
            const query = 5;
            genres.getGames(query)
            .then(data =>{
            displayGames(data, goToPage);
          })}});
      });
    })
  
  genreButtonAdv.addEventListener('click', e =>{

    clearUI();
    const query = 3;
    searchField.value = '';
    genres.getGames(query)
      .then(data =>{
        displayGames(data);
        resultButtons.addEventListener('click', e => {
          const btn = e.target.closest('.btn-pagination');
        
          if(btn) {
            const goToPage = parseInt(btn.dataset.goto, 10);
            clearUI();
            const query = 3;
            genres.getGames(query)
            .then(data =>{
            displayGames(data, goToPage);
          })}});
      });
    })

searchButton.addEventListener('click', e => {

    clearUI();

    const query = searchField.value;

    if(query !== ''){

      gameList.innerHTML = '';

      games.getGames(query)
      .then(data =>{
        if(data.length === 0){
            return gameResults.innerHTML = `<p class = 'mt-4' id='numberOfGames'><b>No Game Found.</b></p>`
        }
        displayGames(data);

      });
    }


});

resultButtons.addEventListener('click', e => {
  const btn = e.target.closest('.btn-pagination');

  if(btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    clearUI();
    const query = searchField.value;
    games.getGames(query)
    .then(data =>{
    displayGames(data, goToPage);
  })}});


const createButton = (page, pageType) => {
  return `<button class='btn-pagination btn_${pageType}' data-goto=${pageType === 'prev' ? page - 1: page + 1}>
          <span  id='pageButton'>Page ${pageType === 'prev' ? page - 1: page + 1}</span>
          </button>`;
}


const renderButtons = (page, gameTotalNumbers, gamePerPage) => {
      const pages = Math.ceil(gameTotalNumbers/gamePerPage);

      let button;

      if(page === 1 && pages > 1){
        button = createButton(page, 'next');
      } else if(page < pages){
        button = `
                ${createButton(page, 'prev')}
                ${createButton(page, 'next')}        
      `
      } else if(page === pages && pages > 1){
        button = createButton(page, 'prev');
      }

      resultButtons.insertAdjacentHTML('afterbegin', button);
}

function displayGames(data, page = 1, gamePerPage = 6){
  const start = (page-1) * gamePerPage;
  const end = page * gamePerPage;

   gameResults.innerHTML = `<p class = 'mt-4' id='numberOfGames'><b>${data.length} Game Found.</b></p>`

    data.slice(start, end).forEach(game => {
      const markUp = `<div class="card mt-4" id='gameIndividual'>
                      <div class="col no-gutters">
                      <div class="card-img-top">
                       <img src="${game.background_image}" class="img-fluid card-img">
                       </div>
                      <div class="card-body">
                      <h3  class="card-title"><b>${game.released.split('-').splice(0,1)}.</b></h3>
                      <h2>${game.name}</h2>
                      </div>
              </div>
          </div>`;

      gameList.insertAdjacentHTML(`beforeend`, markUp);

    });

    if(gamePerPage > 1){
      renderButtons(page, data.length, gamePerPage);
    }
}

