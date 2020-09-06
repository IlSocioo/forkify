import uniqid from 'uniqid'

export class Ingredients {
    constructor(){
        this.items = [];
    }

    addItem(el){
        const item = {
            id: uniqid(),
            ingredient: el.name
        };
        
        this.items.push(item);
    }

    removeItem(id){
        const toRemove = this.items.findIndex(el => el.id === id);
        
        this.items.splice(toRemove, 1);
    }
}

export class CookInstrument {
    constructor(){
        this.cookers = [];
    }

    addItem(el){
        const cooker = {
            id: uniqid(),
            ingredient: el
        };
        
        this.cookers.push(cooker);
    }

    removeItem(id){
        const toRemove = this.cookers.findIndex(el => el.id === id);
        this.cookers.splice(toRemove, 1);
    }
}