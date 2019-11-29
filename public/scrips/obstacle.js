class Obstacle {

    constructor(app) {
        this.app = app;
        this.posX = app.random(700, 900);
        this.posY = 450;
        this.vel = 7;
        this.update = this.update.bind(this);
        this.tipo = Math.floor(app.random(1, 3));
        this.upd = setInterval(this.update, 20);
    }

    draw() {
        switch (this.tipo) {
            case 1:
                this.app.image(Logica.obstacle1, this.posX, this.posY);
                break;
            case 2:
                this.app.image(Logica.obstacle2, this.posX, this.posY);
                break;
        }

    }

    update() {
        this.posX -= this.vel;
    }

}