class Logica {

    constructor(app) {
        this.app = app;
        this.screenNumber = 0;
        this.mapX = 2592.5;
        this.mapX2 = 2592.5 + 5185;
        this.velMap = 5;
        this.rIndex = 0;
        this.posY = 400;
        this.gravity = 0.5;
        this.velJumping = 0;
        this.runing = [];
        this.jumping = [];
        this.hJumping = [];
        this.isRunnig = true;
        this.isJumping = false;
        this.update = this.update.bind(this);
        this.upd = setInterval(this.update, 20);
        this.animation = this.animation.bind(this);
        this.anim = setInterval(this.animation, 100);
    }

    preload() {
        this.background = this.app.loadImage('/images/fondo.jpg');
        for (let i = 1; i < 11; i++) {
            this.runing.push(this.app.loadImage('/images/correr' + i + '.png'))
        }
        for (let i = 1; i < 11; i++) {
            this.jumping.push(this.app.loadImage('/images/salto' + i + '.png'))
        }
        for (let i = 1; i < 11; i++) {
            this.hJumping.push(this.app.loadImage('/images/salto' + i + '.png'))
        }
    }

    show() {
        this.app.image(this.background, this.mapX2, this.app.height / 2);
        this.app.image(this.background, this.mapX, this.app.height / 2);
        if (this.isRunnig) {
            this.app.image(this.runing[this.rIndex], 100, this.posY);
        }
        if (this.isJumping) {
            this.app.image(this.jumping[this.rIndex], 100, this.posY);
        }
    }

    keyReleased() {
        if (this.isJumping == false && this.app.key == 'S' || this.app.key == 's') {
            this.isJumping = true;
            this.isRunnig = false;
            this.rIndex = 0;
            this.velJumping = -8;
        }
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

        if (this.isJumping) {
            this.posY += this.velJumping;
            this.velJumping += this.gravity;
        }

        if (this.posY >= 400 && this.isJumping) {
            this.isJumping = false;
            this.isRunnig = true;
            this.rIndex = 0;
        }
    }

    animation() {
        this.rIndex++;
        if (this.isRunnig && this.rIndex >= 10) {
            this.rIndex = 0;
        }
        if (this.isJumping && this.rIndex >= 10) {
            this.rIndex = 0;
        }
    }
}