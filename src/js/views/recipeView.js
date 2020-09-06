import {element} from './base';

//Inserisce markup del card-text e viene chiamata da renderBasicInfo
const renderWineAdnIngredients = (obj, type='ingr') =>{
    let wineMarkup = "";
    let ingrMarkup = "";
    if (type === 'wine'){
        if (obj.winePairing){
            obj.winePairing.forEach(element => {
                wineMarkup += `
                <li>${element} </li>
                `;
            });
            return wineMarkup;
        }
    } else {
            if (obj.ingredients){
                obj.ingredients.forEach( element => {
                    ingrMarkup += `<li> ${element.name} </li>`;
                });
            return ingrMarkup;
            }
    }
}


//Inserisce il MarkUp e viene chiamata da RenderRecepiInformation
const renderBasicInfo = obj =>{
    const markup = `
    <div class="showed-recipe">
        <img class="recipe-img" src="${obj.image}" alt="${obj.title}"/>
        <div class="recipe-information">
            <div class="row justify-content-around align-items-center text-content">
                <h6 class="recipe-title text-center">${obj.title}</h6>
                <a role ="button"><i class="fas fa-heart mr-3 like-button"></i></a>
            </div>
            <div class="recipe-eating-instruction">
                <div class ="ingredients-wrapper">
                    <span class="icon-head"> <i class="fas fa-utensils"></i> </span>
                    <div class = "card-text">
                        <ul class="ingredient-list">
                            ${renderWineAdnIngredients(obj)}
                        </ul>
                    </div>
                    <div class="card-footer bg-info"></div>
                </div>

                <div class="wines-wrapper">
                    <span class="icon-head"> <i class="fas fa-wine-glass-alt"></i> </span>
                    <div class = "card-text">
                        <ul class="paired-wines-list">
                            ${renderWineAdnIngredients(obj, 'wine')}
                        </ul>
                    </div>
                    <div class="card-footer bg-info"></div>
                </div>
            </div>
        </div>
        <button class="btn btn-outline-danger my-2 mx-auto w-50 shop__btn"> Aggiungi elemento al carrello </button>
    </div>
    `;
    element.centralWrapper.insertAdjacentHTML('afterbegin', markup);
}

//Pulisce i campi in cui vengono visualizzate le ricette al centro dello schermo
export const clearRecepiInfo = ()=>{
    element.centralWrapper.innerHTML ="";
   
}

export const clearRecepiInstruction = () =>{
    element.stepList.innerHTML = '';
    element.occurrentList.innerHTML = '';
}

// Mostra all'utente le possibili combinazioni di vini e gli ingredienti del piatto
export const renderRecepiInformation = obj =>{
    renderBasicInfo(obj);

}

//Inserisce il MarkUp per le istruzioni per la preparazione
const createInstruction = obj => {
    let markupSteps = "";
    let markupEquip = "";
    obj.instructions.steps.forEach( el => {
        markupSteps += `<li data-prova > ${el} </li>`;
    });
    obj.instructions.equipment.forEach( el => {
        if(el != 'undefined'){
        markupEquip += `<li data-prova > ${el} </li>`;
        }
    });

    element.stepList.insertAdjacentHTML("beforeend", markupSteps);
    element.occurrentList.insertAdjacentHTML("beforeend", markupEquip);


}
//Mostra all'utente i passi da fare
export const renderSteps = obj =>{
    createInstruction(obj);
}

