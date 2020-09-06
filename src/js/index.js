import Search from './models/Search';
import Recipe from './models/Recipe';
import Like from './models/Like';
import {Ingredients, CookInstrument} from './models/List';
import {element, renderLoader, cleanLoader} from './views/base';
import * as listView from './views/listView';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as likeView from './views/likeView';


const state = {};

//SEARCH CONTROLLER
async function controlSearch(){
    // Getting query from the view
    const query = searchView.getInput(); 

    if(query){
        document.querySelector('.left__result').classList.add('lateral-color');
        document.querySelector('.right__result').classList.add('lateral-color');

        //Add the new Search Object to the state object
        state.search = new Search(query);
        //Prepare the UI for the displayng
        searchView.clearInput();
        searchView.clearLeftColumn();
        renderLoader(element.serchLeftDiv);

        try {
            //Do the search and store in state obj
            await state.search.getApiTest();

            //display result on UI
            console.log(state.search.result);
            cleanLoader();
            searchView.renderRisult(state.search.result);

        } catch (err) {
            console.log(err);
            alert(err);
            cleanLoader();
        }
        
       
    }

}

element.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    recipeView.clearRecepiInfo();
    controlSearch();
});

element.searchPagination.addEventListener('click', e => {
    const btn = e.target.closest('.pagination-btn');

    if (btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearLeftColumn();
        searchView.renderRisult(state.search.result, goToPage);
    }
});

const controlRecepi = async ()=>{
    const id = window.location.hash.replace('#', '');

    if(id){
        //create the object
        state.recepi = new Recipe(id)

        //clear the data 
        recipeView.clearRecepiInfo();
        recipeView.clearRecepiInstruction();
        renderLoader(element.centralWrapper);

        try {
             //get the data
            await state.recepi.getRecepiByID();

            //use methods from the Recepi Models)
            state.recepi.createSteps();

            //display in the UI
            cleanLoader();
            console.log(state.recepi);
            recipeView.renderRecepiInformation(state.recepi);
            recipeView.renderSteps(state.recepi);

        } catch (err){
            console.log(err);
            alert('ricetta non disponibile. prova con un altra!');
        }
       
    }
}


//RECIPE CONTROLLER
['hashchange', 'load'].forEach(element => window.addEventListener(element, controlRecepi));


//LIST CONTROLLER 
element.centralWrapper.addEventListener('click', e =>{
   let shop__btn = e.target.closest('.shop__btn');
   if(shop__btn){
       shop__btn.addEventListener('click', AddtoShoppingList());
   }
})

// Creo, Aggiungo e renderizzo Items al carrello
function AddtoShoppingList(){
    state.ingredient = new Ingredients();
    state.cookInstrument = new CookInstrument();
    element.rightWrapper.innerHTML = '';
    //Aggiornare il Database per entramber gli oggetti
    state.recepi.ingredients.forEach(element => {
        state.ingredient.addItem(element);
    });

    state.recepi.instructions.equipment.forEach(element => {
        state.cookInstrument.addItem(element);
    });

    console.log(state.ingredient, state.cookInstrument);

    //Aggiornare UI Mostrando gli elementi
    if (!element.rightWrapper.className.includes('lateral-color')){
        element.rightWrapper.classList.add('lateral-color');
    }
    listView.renderShopList(state.ingredient, state.cookInstrument);
}

//Elimino elemento dal carrello
element.rightWrapper.addEventListener('click', e => {
    let deleteBtn = e.target.closest('.delete__item');
    if (deleteBtn){

        let elementToDelete = deleteBtn.parentNode.parentNode;
        //Prendere il Dataset con ID
        let idForDelete = elementToDelete.dataset.itemid;

        //Chiamare Funzione per Eliminare 
        if (elementToDelete.dataset.type === 'ingr'){
            state.ingredient.removeItem(idForDelete);
        } else {
            state.cookInstrument.removeItem(idForDelete);
        }
        //Eliminare elemento dall'UI
        deleteBtn.addEventListener('click', listView.deleteFromShop(elementToDelete));
    }
   
});

//Like Controllers

element.centralWrapper.addEventListener('click', e => {
    if (e.target.matches('.like-button', '.like-button *')){
        //Creo Lista Likes
        if(!state.likedItem){
            state.likedItem = new Like();
        }

        let id = window.location.hash.replace('#', '');
        if (!state.likedItem.isLiked(id)){
            state.likedItem.addItem(id, state.recepi);
        }
        
    }
});

//Mostro la lista dei likes passando sul cuore
element.likeWindow.addEventListener('mouseenter', function(){
    const likeBtn = element.likedList;

    if(state.likedItem){
        likeView.renderLikeList(state.likedItem.likes);  
        gsap.to( likeBtn, {
            opacity: 1,
            duration: 0.5,
            ease: 'ease'
        });
    }
});

//Tolgo la lista se uscendo dalla lista
element.likedList.addEventListener('mouseleave', async function(){
    const likeBtn = element.likedList;
    
    await gsap.to( likeBtn, {
        opacity: 0,
        duration: 0.5,
        ease: 'ease'
    });
    likeBtn.innerHTML = '';
})


//Se uno ci va sopra do la possibilità di cancellare
element.likedList.addEventListener('mouseover', e =>{
    if (e.target.className.includes('like-box')){
        let animateTo = e.target.closest('[data-likebox ="likebox"]');
        animateTo.addEventListener('mouseenter', function(){
            console.log(animateTo);
        const tl = gsap.timeline({defaults: {duration: 0.25, ease: 'linear'}});

        tl.to(animateTo,{
            x: -30,
            delay:0.09
        })
        });
        
    }
});


//Cencello elemento 
element.likedList.addEventListener('click', e =>{
    if (e.target.matches('.like__deleter , .like__deleter > i')){
        let elementToDelete = e.target.closest('.like__item');
        let id = elementToDelete.getAttribute('href').replace('#', '');
        console.log(elementToDelete);
        element.likedList.removeChild(elementToDelete)
        state.likedItem.removeItem(id);
        if(!state.likedItem.likes){
            element.likedList.style.opacity = 0;
        }

    }
});

ScrollOut({
    targets: '[data-prova]',
    threshold: 0.3,
    onShown: function(el){
        el.classList.add('animate__animated', 'animate__fadeInUpBig');
    },
    onHidden: function(el){
        el.classList.remove('animate__animated', 'animate__fadeInUpBig');

    }
});

