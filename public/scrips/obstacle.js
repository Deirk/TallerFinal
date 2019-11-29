class Obstacle {

    constructor(app) {
        this.app = app;
        this.posX = app.random(700, 900);
        this.posY = 450;
        this.vel = 7;
        this.update = this.update.bind(this);
        this.upd = setInterval(this.update, 20);
    }

    draw() {
        this.app.image(Logica.obstacle1, this.posX, this.posY);
    }

    update() {
        this.posX -= this.vel;
    }

}