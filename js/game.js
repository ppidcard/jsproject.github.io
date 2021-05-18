/*obtain game singe page data => obtain all game data => 
=> render results to html => 
*/ 

//get first 20 games

// async function getGames(query){
//     try{
//         const res = await axios.get('https://api.rawg.io/api/games', {
//             params:{
//                 search:query,
//                 dates:'2016-01-01,2021-04-27',
//                 key:'2d57620042ac4120b2089b654420524e',
//                 platforms:'18'
//             }
//         })

//         const data = res.data.results;
//         return data;
//     }catch(err){
//         alert(`Error! ${err}`);
//     }
// }



//Get all games

async function getGames(query){
    try{
    let data = [];
   
    async function getAll(page = 1){
       const res = await axios.get('https://api.rawg.io/api/games', {
           params:{
               key:'2d57620042ac4120b2089b654420524e',
               dates: '2016-01-01,2021-04-27',
               platforms:'18',
               search: query,
               page:page,
   
           }
       });
   
       res.data.results.forEach(element => {
           data.push(element);
       });
       
   
       if(page * 20 < res.data.count){
         return  await getAll(page+1);
       }
       return data;
       };
   
       const game =  await getAll();
       return game;
    } catch (err){alert(`ERROR: ${err}`)

    }
   }

   async function getGenres(genre){
    try{
    let data = [];
   
    async function getAll(page = 1){
        const res = await axios.get('https://api.rawg.io/api/games', {
            params:{
                key:'2d57620042ac4120b2089b654420524e',
                dates: '2021-01-01,2021-04-27',
                platforms:'18',
                genres: genre,
                page:page,
    
            }
        });
    
        res.data.results.forEach(element => {
            data.push(element);
        });
        
    
        if(page * 20 < res.data.count){
          return  await getAll(page+1);
        }
        return data;
        };
    
        const game =  await getAll();
        return game;
    }catch (err){alert(`ERROR: ${err}`)
    }
}

        