class Logica {

    static obstacle1;
    static obstacle2;

    constructor(app) {
        this.app = app;
        this.screenNumber = 0;
        this.mapX = 2592.5;
        this.mapX2 = 2592.5 + 5185;
        this.velMap = 7;
        this.rIndex = 0;
        this.posY = 400;
        this.gravity = 0.5;
        this.velJumping = 0;
        this.runing = [];
        this.kicking = [];
        this.jumping = [];
        this.hJumping = [];
        this.obstacles = [];
        this.isRunnig = true;
        this.isJumping = false;
        this.isHJumping = false;
        this.isKicking = false;
        this.update = this.update.bind(this);
        this.upd = setInterval(this.update, 20);
        this.animation = this.animation.bind(this);
        this.anim = setInterval(this.animation, 120);
        this.generateObstacle = this.generateObstacle.bind(this);
        this.anim = setInterval(this.generateObstacle, 5000);
    }

    preload() {
        this.background = this.app.loadImage('/images/fondo.jpg');
        Logica.obstacle1 = this.app.loadImage('/images/objeto1.png');
        Logica.obstacle2 = this.app.loadImage('/images/objeto2.png');


        for (let i = 1; i < 11; i++) {
            this.runing.push(this.app.loadImage('/images/correr' + i + '.png'))
        }
        for (let i = 1; i < 11; i++) {
            this.jumping.push(this.app.loadImage('/images/salto' + i + '.png'))
        }
        for (let i = 1; i < 10; i++) {
            this.hJumping.push(this.app.loadImage('/images/alto' + i + '.png'))
        }
        for (let i = 1; i < 10; i++) {
            this.kicking.push(this.app.loadImage('/images/patada' + i + '.png'))
        }
    }

    show() {
        this.app.image(this.background, this.mapX2, this.app.height / 2);
        this.app.image(this.background, this.mapX, this.app.height / 2);
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].draw();
            
        }
        if (this.isRunnig) {
            this.app.image(this.runing[this.rIndex], 100, this.posY);
        }
        if (this.isJumping) {
            this.app.image(this.jumping[this.rIndex], 100, this.posY);
        }
        if (this.isHJumping) {
            this.app.image(this.hJumping[this.rIndex], 100, this.posY);
        }
        if (this.isKicking) {
            this.app.image(this.kicking[this.rIndex], 100, this.posY);
        }
    }

    keyReleased() {
        if (this.isRunnig == true) {
            if (this.app.key == 'S' || this.app.key == 's') {
                this.isJumping = true;
                this.isRunnig = false;
                this.rIndex = 0;
                this.velJumping = -9;
            }
            if (this.app.key == 'A' || this.app.key == 'a') {
                this.isHJumping = true;
                this.isRunnig = false;
                this.rIndex = 0;
                this.velJumping = -12;
            }
            if (this.app.key == 'D' || this.app.key == 'd') {
                this.isKicking = true;
                this.isRunnig = false;
                this.rIndex = 0;
            }
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

        if (this.isJumping || this.isHJumping) {
            this.posY += this.velJumping;
            this.velJumping += this.gravity;
        }

        if (this.posY >= 400 && this.isJumping) {
            this.isJumping = false;
            this.isRunnig = true;
            this.rIndex = 0;
        }

        if (this.posY >= 400 && this.isHJumping) {
            this.isHJumping = false;
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
            this.rIndex = 10;
        }
        if (this.isHJumping && this.rIndex >= 9) {
            this.rIndex = 9;
        }
        if (this.isKicking && this.rIndex >= 9) {
            this.rIndex = 9;
            this.isKicking =false;
            this.isRunnig = true;
        }
    }

    generateObstacle(){
        this.obstacles.push(new Obstacle(this.app));
    }
}