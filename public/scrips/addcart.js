window.addEventListener('load', function(){

    var btnsAdd = document.querySelectorAll('.store__bag');
    var cartSize = document.querySelector('.header__bag');


   

    var promise = fetch('/api/cartCount', { method: 'POST' });
    promise
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            cartSize.innerText = ""+data.cartSize;

        });


    btnsAdd.forEach(function (btn) {
        
        btn.addEventListener('click', function(event){
            event.preventDefault();
            var id = btn.getAttribute('data-name');

            console.log("este id: "+id);
            var promise = fetch('/api/cart/' + id, { method: 'POST' });
            promise
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function (data) {
                    console.log(data.cartSize);
                    cartSize.innerText =""+ data.cartSize;
                    
                });

                window.location.reload();

        });


    });
 
});