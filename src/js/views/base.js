export const element = {
    searchInput: document.querySelector('.input-form'),
    likeWindow: document.querySelector('.like-window'),
    serchLeftDiv: document.querySelector('.search-result'),
    searchForm: document.querySelector('.form-parent'),
    searchResultList: document.querySelector('.product-list'),
    searchPagination: document.querySelector('.button-pagination'),
    centralWrapper: document.querySelector('.wrapper-products'),
    occurrentList: document.querySelector('.occurent-list'),
    stepList: document.querySelector('.step-list'),
    rightWrapper: document.querySelector('.right__result'),
    likedList: document.querySelector('.like-list')
    
};

export const renderLoader = parent => {
    const loader = `
    <div class="loader">
        <i class="fas fa-spinner"></i>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const cleanLoader = ()=>{
    const loader = document.querySelector('.loader');
    if (loader){
        loader.parentNode.removeChild(loader);
    }
}