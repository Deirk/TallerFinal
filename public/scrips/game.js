new p5(function (app) {
   
    var log = new Logica(app);

    app.setup = function () {
        this.cnv = app.createCanvas(600, 600);
        this.cnv.parent('game');
        app.colorMode(app.HSB, 360, 100, 100);
        app.imageMode(app.CENTER);

    }

    app.preload = function (){
       log.preload();
    }

    app.draw = function () {
        app.background(0,0,100);
        log.show();
    }

    app.mousePressed = function () {
       log.mPressed();
    }

    app.keyReleased = function () {
       log.keyReleased();
    }

});