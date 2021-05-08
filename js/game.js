class Game {
    async getGames(type, query){
        const apiUrl = `https://api.rawg.io/api/games?key=b6b23e28fbd04daca92ed23fa50436b3&dates=2016-01-01,2021-04-27&platforms=18&${type}=${query}`;
        let data = [];
        
        const getAllGames = async(page = 1) =>{
            const results = await axios.get(`${apiUrl}&page=${page}`);

            results.data.results.forEach(game =>{
                data.push(game);
            });
            

            if(page*20<results.data.count){
                return await getAllGames(page + 1);
            } else {
                return data;
            }
        }
        
        const games = await getAllGames();

        return games;

    }
    }

    class Genre {

        async getGames(query){
            const apiUrl = `https://api.rawg.io/api/games?key=b6b23e28fbd04daca92ed23fa50436b3&dates=2016-01-01,2021-04-27&platforms=18&genres=${query}`;
        
            let data = [];
            const getAllGames = async(page = 1) =>{
                let results = await axios.get(`${apiUrl}&page=${page}`);
        
                results.data.results.forEach(game =>{
                    data.push(game);
                });
        
                if(page*20<results.data.count){
                    return await getAllGames(page + 1);
                } else {
                    return data;
                }
            }
            
            const games = await getAllGames();
    
            return games;
    
        }
        }




        