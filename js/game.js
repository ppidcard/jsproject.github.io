class Game {
    constructor(){
        this.api_key = 'b6b23e28fbd04daca92ed23fa50436b3'
    }

    async getGames(query){
        const apiUrl = `https://api.rawg.io/api/games?key=${this.api_key}&dates=2016-01-01,2021-04-27&platforms=18&search=${query}`;
    
        let data = [];
        const getAllGames = async(page = 1) =>{
            let results = await fetch(`${apiUrl}&page=${page}`);
            results = await results.json();
    
            results.results.forEach(game =>{
                data.push(game);
            });
    
            if(page*20<results.count){
                return await getAllGames(page + 1);
            } else {
                return data;
            }
        }
        
        let games = await getAllGames();

        return games;

    }
    }

    class Genre {
        constructor(){
            this.api_key = 'b6b23e28fbd04daca92ed23fa50436b3'
        }
    
        async getGames(query){
            const apiUrl = `https://api.rawg.io/api/games?key=${this.api_key}&dates=2016-01-01,2021-04-27&platforms=18&genres=${query}`;
        
            let data = [];
            const getAllGames = async(page = 1) =>{
                let results = await fetch(`${apiUrl}&page=${page}`);
                results = await results.json();
        
                results.results.forEach(game =>{
                    data.push(game);
                });
        
                if(page*20<results.count){
                    return await getAllGames(page + 1);
                } else {
                    return data;
                }
            }
            
            const games = await getAllGames();
    
            return games;
    
        }
        }


        