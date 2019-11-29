function handleLoad() {

    var btnFilter = document.querySelector('.header__filter');
    var filter = document.querySelector('.store__filter');
    var btnSort = document.querySelector('.header__sort');
    var sort = document.querySelector('.store__sort');
   
    function handleClick(){
        filter.classList.toggle('store__filter--active');
        console.log('funciona el cambio');
    }
    btnFilter.addEventListener('click', handleClick);

    function handleSort(){
        sort.classList.toggle('store__sort--active');
        console.log('funciona el cambio');
    }
    btnSort.addEventListener('click', handleSort);
    
}window.addEventListener('load', handleLoad);
