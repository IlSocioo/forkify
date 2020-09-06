import {element} from './base'

export const deleteFromShop = el => {
    el.parentNode.removeChild(el);
}


function createIngrMarkup(obj){
    let ingrMarkup ='';

    obj.items.forEach(element => {
        ingrMarkup +=`
        <li class="row justify-content-between w-75" data-itemid =${element.id} data-type="ingr">
            <span> ${element.ingredient} </span> <span><button class="btn btn-sm btn-danger rounded delete__item"> x </button></span>
        </li>
        `
    });


    return ingrMarkup;
}

function createEquipMarkup(obj){
    let equipMarkup = '';
    obj.cookers.forEach(element => {
        equipMarkup +=`
        <li class="row justify-content-between w-75" data-itemid =${element.id} data-type="ingr">
            <span> ${element.ingredient} </span> <span><button class="btn btn-sm btn-danger rounded delete__item"> x </button></span>
        </li>
        `
    });
    return equipMarkup;
}

    



export const renderShopList = (objIngr, objEquip) => {
    let markup = `
    <header>
        <h4 class="text-center title-shop"> My shopping List </h4>
    </header>
    <div class="list__items mx-1 my-4">
        <div>
            <ul>
                ${createEquipMarkup(objEquip)}
            </ul>
        </div>
        <div>
            <ul>
                ${createIngrMarkup(objIngr)}
            </ul>
        </div>
    </div>
    `;

    element.rightWrapper.insertAdjacentHTML('beforeend', markup);
}
