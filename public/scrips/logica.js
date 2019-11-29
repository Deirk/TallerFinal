class Logica {

    constructor(app) {
        this.app = app;
        this.screenNumber = 0;
        this.mapX = 2592.5;
        this.mapX2 = 2592.5 + 5185;
        this.velMap = 5;
        this.rIndex = 0;
        this.runing = [];
        this.update = this.update.bind(this);
        this.upd = setInterval(this.update, 20);
        this.animation = this.animation.bind(this);
        this.anim = setInterval(this.animation, 100);
    }

    preload() {
        this.background = this.app.loadImage('/images/fondo.jpg');
        for (let i = 1; i < 10; i++) {
            this.runing.push(this.app.loadImage('/images/correr' + i + '.png'))
        }
    }

    show() {
        this.app.image(this.background, this.mapX2, this.app.height / 2);
        this.app.image(this.background, this.mapX, this.app.height / 2);
        this.app.image(this.runing[this.rIndex], 100, 400);
    }

    update() {
        this.mapX -= this.velMap;
        this.mapX2 -= this.velMap;
        if (this.mapX <= -5185) {
            this.mapX = this.mapX2 + 5185;
        }
        if (this.mapX2 <= -5185) {
            this.mapX2 = this.mapX + 5185;
        }
    }

    animation() {
        this.rIndex++;
        if (this.rIndex > 9) {
            this.rIndex = 0;
        }
    }
}