class Logica {

    static obstacle1;
    static obstacle2;
    static obstacle3;

    constructor(app) {
        this.app = app;
        this.screenNumber = 0;
        this.mapX = 2592.5;
        this.mapX2 = 2592.5 + 5185;
        this.velMap = 7;
        this.rIndex = 0;
        this.posY = 390;
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
    }

    preload() {
        this.background = this.app.loadImage('/images/fondo.jpg');
        this.startMenu = this.app.loadImage('/images/inicio.jpg');
        this.instructions = this.app.loadImage('/images/instrucciones.jpg');
        Logica.obstacle1 = this.app.loadImage('/images/objeto1.png');
        Logica.obstacle2 = this.app.loadImage('/images/objeto2.png');
        Logica.obstacle3 = this.app.loadImage('/images/objeto3.png');


        for (let i = 1; i < 11; i++) {
            this.runing.push(this.app.loadImage('/images/correr' + i + '.png'))
        }
        for (let i = 1; i < 11; i++) {
            this.jumping.push(this.app.loadImage('/images/salto' + i + '.png'))
        }
        for (let i = 1; i < 10; i++) {
            this.hJumping.push(this.app.loadImage('/images/alto' + i + '.png'))
        }
        for (let i = 1; i < 6; i++) {
            this.kicking.push(this.app.loadImage('/images/patada' + i + '.png'))
        }
    }

    show() {
        switch (this.screenNumber) {
            case 0:
                this.app.image(this.startMenu, this.app.width / 2, this.app.height / 2, 600, 600);
                break;

            case 1:
                this.app.image(this.instructions, this.app.width / 2, this.app.height / 2, 600, 600);
                break;

            case 2:
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
                break;

        }

    }

    keyReleased() {
        if (this.isRunnig == true) {
            if (this.app.key == 'S' || this.app.key == 's') {
                this.isJumping = true;
                this.isRunnig = false;
                this.rIndex = 0;
                this.velJumping = -8;
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

        if (this.posY >= 390 && this.isJumping) {
            this.isJumping = false;
            this.isRunnig = true;
            this.rIndex = 0;
        }

        if (this.posY >= 390 && this.isHJumping) {
            this.isHJumping = false;
            this.isRunnig = true;
            this.rIndex = 0;
        }
        this.validate();
    }

    animation() {
        this.rIndex++;
        if (this.isRunnig && this.rIndex >= 10) {
            this.rIndex = 0;
        }
        if (this.isJumping && this.rIndex >= 10) {
            this.rIndex = 9;
        }
        if (this.isHJumping && this.rIndex >= 8) {
            this.rIndex = 8;
        }
        if (this.isKicking && this.rIndex >= 5) {
            this.rIndex = 0;
            this.isKicking = false;
            this.isRunnig = true;
        }
    }

    validate() {
        for (let i = 0; i < this.obstacles.length; i++) {
            const o = this.obstacles[i];
            if (o.tipo == 3 && this.isKicking) {
                if (this.app.dist(180, this.posY + 30, o.posX, o.posY) < 45) {
                    o.stopAsync();
                    this.obstacles.splice(i, 1);
                    return;
                }
            } else if (o.tipo == 3 && this.isJumping) {
                if (this.app.dist(180, this.posY , o.posX, o.posY) < 80) {
                    this.reset();
                }
            }
        }

        for (let i = 0; i < this.obstacles.length; i++) {
            const o = this.obstacles[i];

            if (o.posX <= -100) {
                o.stopAsync();
                this.obstacles.splice(i, 1);
            }

        }



        for (let i = 0; i < this.obstacles.length; i++) {
            const o = this.obstacles[i];
            if (o.tipo == 1) {
                if (this.app.dist(150, this.posY + 50, o.posX+100, o.posY) < 50) {
                    this.reset();
                }
            }
            if (o.tipo == 3) {
                if (this.app.dist(100, this.posY + 40, o.posX, o.posY) < 38) {
                    this.reset();
                }
            }
            if (o.tipo == 2) {
                if (this.app.dist(100, this.posY + 50, o.posX, o.posY) < 20) {
                   this.reset();
                }
            }
        }
    }

    mPressed() {
        switch (this.screenNumber) {
            case 0:
                if (this.app.mouseX > 159 && this.app.mouseX < 441 && this.app.mouseY > 508 && this.app.mouseY < 560) {
                    this.screenNumber++;
                }
                break;

            case 1:
                this.screenNumber++;
                this.update = this.update.bind(this);
                this.upd = setInterval(this.update, 20);
                this.animation = this.animation.bind(this);
                this.anim = setInterval(this.animation, 50);
                this.generateObstacle = this.generateObstacle.bind(this);
                this.generate = setInterval(this.generateObstacle, 3000);
                break;
        }
    }

    generateObstacle() {
        this.obstacles.push(new Obstacle(this.app));
    }

    reset(){
        clearInterval(this.upd);
        clearInterval(this.anim);
        clearInterval(this.generate);
        for (let j = 0; j < this.obstacles.length; j++) {
            this.obstacles[j].stopAsync();

        }
        this.screenNumber = 0;
        this.mapX = 2592.5;
        this.mapX2 = 2592.5 + 5185;
        this.velMap = 7;
        this.rIndex = 0;
        this.posY = 390;
        this.gravity = 0.5;
        this.velJumping = 0;
        this.isRunnig = true;
        this.isJumping = false;
        this.isHJumping = false;
        this.isKicking = false;
        this.obstacles = [];
    }
}