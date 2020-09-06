import {element} from './base';
import {truncateTitle} from './searchView';

export const renderLikeList = function(likedItems){
    likedItems.forEach(element => {
        createListMarkUp(element);
    });
}

function createListMarkUp(item){

    
    let markup = `
        <a class="like__item" href="#${item.id}">
            <div class="text-result like-box ml-2" data-likebox ="likebox">
                <img src="${item.img}" alt="immagine del prodotto" class="product-img">
                <h6 class="product__title">${truncateTitle(item.title)}</h6>
            </div>
            <span class="like__deleter" data-delete="delete"> 
                <i class="fas fa-trash"></i>
            </span>
        </a>
    `;
    element.likedList.insertAdjacentHTML('beforeend', markup);
}