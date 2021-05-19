//Clear UP before next search
//Clear UP before next search
//Clear UP before next search

const clearUI = () =>{
  numOfGames.innerHTML = '';
  gamesDetails.innerHTML = '';
  resultButtons.innerHTML = '';
}

//Use input value to fetch games
//Use input value to fetch games
//Use input value to fetch games


fetchGames.addEventListener('click', e => {
  clearUI();
  if(gameInput.value === ''){
    numOfGames.innerHTML = `<p class = 'mt-4' id='numberOfGames'><b>No Game Entered...</b></p>`}
    else {getGames(gameInput.value)
    .then(data =>{
      if(data.length === 0){
      return numOfGames.innerHTML = `<p class = 'mt-4' id='numberOfGames'><b>No Game Found.</b></p>`
      } else {console.log (data); displayGames(data)};
    });
  } 
});

//Add 'enter' keydown
//Add 'enter' keydown
//Add 'enter' keydown

gameInput.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    fetchGames.click();
  } else if(event.keyCode === 27){
    gameInput.value = '';
  }
});

//render resuts to html
//render resuts to html
//render resuts to html


function displayGames(data, page = 1, gamePerPage = 6){
  const start = (page-1) * gamePerPage;
  const end = page * gamePerPage;
  
   numOfGames.innerHTML = `<p class = 'mt-4' id='numberOfGames'><b>${data.length} Game Found.</b></p>`

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
          const appendMarkUp = document.createElement('div');
          appendMarkUp.innerHTML = markUp;

          gamesDetails.appendChild(appendMarkUp);

    });
      renderButtons(page, data.length, gamePerPage);
}

//create button UI

const createButton = (page, pageType) => {
  return `<button class='btn-pagination btn_${pageType}' data-goto=${pageType === 'prev' ? page - 1: page + 1}>
          <span  id='pageButton'>Page ${pageType === 'prev' ? page - 1: page + 1}</span>
          </button>`;
}


//render button to html

const renderButtons = (page, gameTotalNumbers, gamePerPage) => {
  const pages = Math.ceil(gameTotalNumbers/gamePerPage);

  const button = document.createElement('div');

  if(page === 1 && pages > 1){
    button.innerHTML = createButton(page, 'next');
  } else if(page < pages){
    button.innerHTML = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}        
  `
  } else if(page === pages && pages > 1){
    button.innerHTML = createButton(page, 'prev');
  } else{
    button.innerHTML ='';
  }
  resultButtons.append(button);
}

//create next pages
resultButtons.addEventListener('click', e => {
  const btn = e.target.closest('.btn-pagination');
  console.log(e.target);
    const goToPage = parseInt(btn.dataset.goto, 10);
    clearUI();
    getGames(gameInput.value)
    .then(data =>{
    displayGames(data, goToPage);
  })});


//obtain games by searching genres
genresTotal.forEach(function(genre) {
  genre.addEventListener('click', function(e){
    clearUI();

    getGenres(genre.dataset.genre).then(data => {
      displayGames(data);
      resultButtons.addEventListener('click', e => {
        const btn = e.target.closest('.btn-pagination');
          const goToPage = parseInt(btn.dataset.goto, 10);
          clearUI();
          getGenres(genre.dataset.genre)
          .then(data =>{
          displayGames(data, goToPage);
        })});
    });
  })
})



