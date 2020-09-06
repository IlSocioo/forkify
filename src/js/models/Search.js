import axios from 'axios';


export default class Search{
    constructor(query){
        this.query = query;
    }

    async getApiTest(){
        const apiKey = "53103f8ca456462982bfa2701b54d574";
        try {
            const provaApi = await axios(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${this.query}&number=10`);
            this.result = provaApi.data;
            //console.log(this.result); 
        } catch (error) {
            console.log(error);
        }
        
    }

}

