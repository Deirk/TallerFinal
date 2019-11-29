window.addEventListener('load', function(){
    
    var btnsLess = document.querySelectorAll('.buttons__less');
    var contP = document.querySelector('.product__quantity');
    var total = document.querySelector('.abstract__total');

    btnsLess.forEach(function (btn) {
        
        btn.addEventListener('click', function(event){
            
            event.preventDefault();
            var id = btn.getAttribute('data-name');
            
            var promise = fetch('/api/cartLess/' + id, { method: 'POST' });
            promise
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                contP.innerText = data.cantProduct;
                total.innerHTML=data.totalC;

            });

            window.location.reload();

           
        });
        
    });
    
});