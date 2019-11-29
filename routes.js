
// todas las funciones que interactuen con la base de datos van aquí
const assert = require('assert');

function createRoutes(app, db) {
    var products = db.collection('products');
    var cartList = [];
    
    app.get('/', (request, response) => {
        response.sendFile(__dirname + '/public/home.html');
    });
    
    
    app.post('/api/cart/:id', (request, response) => {
        var id = request.params.id;
        var query= {};        
        
        var esId=false;
        var cont=1;
        var encuentraComun=false;
        
        products.find({})
        // transformamos el cursor a un arreglo
        .toArray((err, result) => {
            // asegurarnos de que noh ay error
            
            //
            
            var c=0;
            for(c;c<result.length;c++){
                if(request.params.id.toString()===result[c]._id.toString()){
                    esId=true;  
                    var i=0;
                    
                    for(i;i<cartList.length;i++){
                        
                        if (request.params.id.toString()===cartList[i]._id.toString()){
                            
                            encuentraComun=true;
                            
                            cartList[i].cantidad+=1;
                        } 
                    }
                    if(encuentraComun!=true){
                        
                        result[c].cantidad=cont;
                        cartList.push(result[c]);
                    }
                    
                } 
            }
            
            
            if(!esId){
                response.send({
                    message: 'error',
                    cartSize: cartList.length
                });
                return;
            }
            
            
            response.send({
                cartSize: cartList.length
            });
            
        });
        
        
        
    });

    app.post('/api/cartCount', (request,response)=>{

        response.send({
            cartSize:cartList.length
        })
    });
    
    
    
    //Ruta a la tienda
    app.get('/store', function (request, response) {
        
        //Mongo: buscar documentos (Paso 3)
        
        
        products.find()
        .toArray(function (err, allProducts) {
            
            var contexto = {
                productsList: allProducts,
            };
            response.render('store', contexto);
        });
    });
    app.get('/store/:name', (request, response) => {
        console.log('Entro a un producto');
        
        var name = request.params.name;
        
        products.find({ name: name })
        .toArray(function (err, OneProduct) {
            
            var contexto = {
                individual: OneProduct[0],
                
            };
            
            if (contexto == null) {
                response.send('Page not found: ' + req.params.pestana);
            } else {
                response.render('individual', contexto);
                
            }
            
        });
    });
    //Ruta filtros Man - Woman - Kids
    app.get('/store/category/:category', function (request, response) {
        
        console.log('Entro al filtro hombre');
        
        var category = request.params.category;
        
        products.find({ category: category })
        .toArray(function (err, filter) {
            var contexto = {
                productsList: filter,
                
            };
            response.render('store', contexto);
        });
    });
    //Ruta filtros Jordan - Skate - Bascketball
    app.get('/store/type/:type', function (request, response) {
        
        console.log('Entro al filtro type');
        
        var type = request.params.type;
        
        products.find({ type: type })
        .toArray(function (err, filter) {
            var contexto = {
                productsList: filter,
                
            };
            response.render('store', contexto);
        });
    });
    //Ruta filtros colores
    app.get('/store/colors/:colors', function (request, response) {
        
        console.log('Entro al filtro type');
        
        var colors = request.params.colors;
        
        products.find({ colors: colors })
        .toArray(function (err, filter) {
            var contexto = {
                productsList: filter,
                
            };
            response.render('store', contexto);
        });
    });
    
    //Ruta orden precio
    app.get('/store/sort/priceL', function (request, response) {
        
        console.log('Entro al sort price');
        
        var price = request.params.price;
        
        products.find().sort({ price: -1 })
        .toArray(function (err, filter) {
            var contexto = {
                productsList: filter,
                
            };
            response.render('store', contexto);
        });
    });
    app.get('/store/sort/priceH', function (request, response) {
        
        console.log('Entro al sort price');
        
        var price = request.params.price;
        
        products.find().sort({ price: 1 })
        .toArray(function (err, filter) {
            var contexto = {
                productsList: filter,
                
            };
            response.render('store', contexto);
        });
    });
    
    //Ruta orden precio
    app.get('/store/sort/size', function (request, response) {
        
        console.log('Entro al sort size');
        
        var price = request.params.price;
        
        products.find().sort({ size: 1 })
        .toArray(function (err, filter) {
            console.log(filter);
            var contexto = {
                
                productsList: filter,
                
            };
            response.render('store', contexto);
        });
    });
    
    
    
    
    
    //Ruta al carrito
    
    app.get('/shopping', function (req, res) {
        
        
        var listCopy = cartList.slice();
        var price = 0;
        var cantidad = 0;
        
        if(listCopy!=null){
            for(var i=0;i<listCopy.length;i++){
                price+=listCopy[i].price*listCopy[i].cantidad;
                
            }
        }
        
        const context={
            products:listCopy,
            total:price,
        }
        
        res.render('cart', context);
        
    });
    
    app.post('/api/cartMore/:id', (request,response)=>{
        var id = request.params.id;
        
        var listCopy = cartList.slice();
        
        var indexProduct;
        
        for(var c=0;c<listCopy.length;c++){
            if(request.params.id.toString()===listCopy[c]._id.toString()){
                cartList[c].cantidad+=1;
                indexProduct=cartList[c].cantidad;
                
                
            }
        }
        
        var price=0;
        if(listCopy!=null){
            for(var i=0;i<listCopy.length;i++){
                price+=listCopy[i].price*listCopy[i].cantidad;
                
            }
        }
        
        
        response.send({
            cantProduct: indexProduct,
            totalC: "TOTAL $"+price,
        });
    });
    
    //Ruta al formulario
    app.get('/pay', function (request, response) {
        
        var contexto = {
            
        };
        response.render('pay', contexto);
    });
    
    app.post('/api/cartLess/:id', (request,response)=>{
        var id = request.params.id;
        
        var listCopy = cartList.slice();
        
        var indexProduct;
        
        for(var c=0;c<listCopy.length;c++){
            if(request.params.id.toString()===listCopy[c]._id.toString()){
                
                if(cartList[c].cantidad>1){
                    cartList[c].cantidad-=1;
                }else if(cartList[c].cantidad==1){
                    cartList.splice(c,1);
                }
                indexProduct=cartList[c].cantidad;
                
            }
        }
        
        var price=0;
        if(listCopy!=null){
            for(var i=0;i<listCopy.length;i++){
                price+=listCopy[i].price*listCopy[i].cantidad;
                
            }
        }
        
        
        response.send({
            cantProduct: indexProduct,
            totalC: "TOTAL $"+price,
        });
    });

    app.post('/api/cartDelete/:id', (request,response)=>{
        var id = request.params.id;
        
        var listCopy = cartList.slice();
        
        
        var index=listCopy.length;
        for(var c=0;c<listCopy.length;c++){
            if(request.params.id.toString()===listCopy[c]._id.toString()){
                cartList.splice(c,1);
            }
        }

        var price=0;
        if(listCopy!=null){
            for(var i=0;i<listCopy.length;i++){
                price+=listCopy[i].price*listCopy[i].cantidad;
                
            }
        }

        response.send({
            totalCount: "TOTAL $"+price,
        });
        
        
        
    });
    
    //Ruta al formulario
    app.get('/pay', function (request, response) {
        
        var contexto = {
            
        };
        response.render('pay', contexto);
    });
    
    //Ruta al checkout
    app.post('/checkout', function (request, response) {
        
        var listCopy = cartList.slice();
        var price = 0;
        var cantidad = 0;
        
        if(listCopy!=null){
            for(var i=0;i<listCopy.length;i++){
                price+=listCopy[i].price*listCopy[i].cantidad;
                
            }
        }
        var order = {
            email: request.body.email,
            phone: request.body.phone,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            address: request.body.address,
            country: request.body.country,
            state: request.body.state,
            city: request.body.city,
            zip: request.body.zip,
            card: request.body.card,
            year: request.body.year,
            month: request.body.month,
            cvv: request.body.cvv,
            products:cartList,
            total: price
            
        };
        
        var collection = db.collection('orders');
        collection.insertOne(order, function (err) {
            assert.equal(err, null);
            console.log("Pedido Guardado");
            
        });
        response.redirect('/store');
    });
    
    
}

module.exports = createRoutes;

