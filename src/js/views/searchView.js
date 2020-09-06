import {element} from './base';

// Get the value from the search bar
export const getInput = () => element.searchInput.value;

// Clear the search bar input after the search
export const clearInput = () => {
    element.searchInput.value = '';
};

// clean the left column before display anathor list of result
export const clearLeftColumn = () =>{
    element.searchResultList.innerHTML ='';
    element.searchPagination.innerHTML='';
};

//truncate the recipe's name that have more than 25 charcacters
 export const truncateTitle = (title, limit=25) =>{
    if (title.length > limit){
        return `${title.slice(0, limit)}...`;
    } else {
        return title
    }
};


// Render and insert html for after receving the recepi
const renderRecepi = recepi => {
    let markup = `
    <li class = "my-2">
        <a class="result__link" href="#${recepi.id}">
            <img src="${recepi.image}" alt="immagine del prodotto" class="product-img">
            <div class="text-result ml-2">
                <h6 class="product__title">${truncateTitle(recepi.title)}</h6>
                <span class="publisher"> Piace a: ${recepi.likes} persone</span>
            </div>
        </a>
    </li>
    `;
    element.searchResultList.insertAdjacentHTML('beforeend', markup);
};

//create the button for the pagination
const createButton = (page, type) => 
`
<button class="btn pagination-btn btn-${type}" data-goto = ${type === 'next'? page + 1 : page - 1}>
    Page: ${type === 'next'? page + 1 : page - 1} <i class="fas fa-angle-double-${type === 'next'?'right':'left'}"></i>
</button>
`;

// mostrare il bottone creato nella funzione createButton() a seconda del numero di pagina
export const renderButton = (page, itemNum, itemperpage) =>{
    const pages = Math.ceil(itemNum/itemperpage);
    let button;

    if (page === 1 && pages > 1) {
        button = createButton(page, 'next');
    }else if (page > 1 && page < pages) {
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}`;

    }else if (page === pages && pages > 1){
        button = createButton(page, 'prev');
    }

    element.searchPagination.insertAdjacentHTML('afterbegin', button);
}

//Mostrare le recepi sulla sinistra e la paginazione 
export const renderRisult = (recepi, _page = 1, _itemperpage = 4) => {
    const start = (_page - 1)* _itemperpage;
    const end = _page * _itemperpage;

    recepi.slice(start, end).forEach(renderRecepi);
    renderButton(_page, recepi.length, _itemperpage);
};

