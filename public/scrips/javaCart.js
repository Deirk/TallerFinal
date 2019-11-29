//------------------------Carrito de compras-------------------------------   
function handleLoad() {
    var btnsAdd = document.querySelectorAll('.product__bag');
    var cartCount = document.querySelector('.header__bag');

    btnsAdd.forEach(function (btn) {
        
        btn.addEventListener('click', function(event){
            
            event.preventDefault();
            var id = btn.getAttribute('data-name');

            var promise = fetch('/api/cart/' + id, { method: 'POST' });
            promise
                .then(function (response) {
                    console.log(response);
                    console.log('boton de comprar');
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    cartCount.innerText = data.cartLength;
                });

        });

    });
}window.addEventListener('load', handleLoad);