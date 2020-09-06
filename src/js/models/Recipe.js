import axios from 'axios';

export default class Recipe{

    constructor(id){
        this.id = id
    }
    
    async getRecepiByID(){
        const apiKey = "53103f8ca456462982bfa2701b54d574";
        try{
            const recepi = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${apiKey}`);
            const recepiEl = recepi.data;
            console.log(recepiEl);
            this.title = recepiEl.title;
            this.image = recepiEl.image;
            this.servings = recepiEl.servings
            this.ingredients = recepiEl.extendedIngredients;
            this.instructions = recepiEl.analyzedInstructions;
            this.winePairing = recepiEl.winePairing.pairedWines;
        } catch (err){
            console.log(err);
        }
    }

    createSteps(){
        let stepArray, occurret;
        let equip = [];
        stepArray = this.instructions.map(el => el.steps);
        occurret = stepArray[0].map(el => el.equipment.map(el => el.name));
        occurret.forEach(element => {
            element.forEach( el => {
                if (!equip.includes(el)){
                    equip.push(el);
                }
            });
        });
        this.instructions = {
           steps: stepArray[0].map(el => el.step),
           equipment: equip,
        }
    }

}
