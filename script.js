let paintbox = document.getElementById('paintbox')
let context = paintbox.getContext('2d')
// context.fillRect(50, 50, 10, 10)
// https://www.w3schools.com/html/html5_canvas.asp

let gameon = true;
let playerspeed = 5;
class Box {
    constructor(size, color) {
        this.size = size;
        this.color = color;
        this.x = 0;
        this.y = 0;
    }
}

class Player extends Box {
    constructor(speed, moving) {
        super(50, 'blue');
        this.x = 0;
        this.y = 225;
        this.speed = 0;
    }

    move() {
        this.x += this.speed;
    }
}

class Enemy extends Box {
    constructor(speed) {
        super(50, 'red');
        this.speed = speed;
    }

    move() {
        this.y += this.speed;
        if (this.y + this.size > 500) {
            this.speed = -(Math.abs(this.speed));
        }
        if (this.y < 0) {
            this.speed = (Math.abs(this.speed));
        }
    }
}

let player = new Player();
let e1 = new Enemy(4);
let e2 = new Enemy(8);
let e3 = new Enemy(12);
e1.x = 100;
e2.x = 230;
e3.x = 366;

function drawBox(box) {
    context.fillStyle = box.color;
    context.fillRect(box.x, box.y, box.size, box.size);
}


function isCollided(box1, box2) {
    if(Math.abs(e1.x - player.x) < 50 && Math.abs(e1.y - player.y) < 50) {
        return 1;
    }

    if(Math.abs(e2.x - player.x) < 50 && Math.abs(e2.y - player.y) < 50) {
        return 1;
    }
    if(Math.abs(e3.x - player.x) < 50 && Math.abs(e3.y - player.y) < 50) {
        return 1;
    }
}

paintbox.addEventListener('mousedown', () => {
    player.speed = playerspeed;
})

paintbox.addEventListener('mouseup', () => {
    player.speed = 0;

})

setInterval(() => {
    playerspeed += 0.5;
    // playerspeed = parseInt(Math.random() * 10);
    // player.y = 100 + Math.random() * 300;
}, 2000);
// setInterval(() => {
//     context.clearRect(0, 0, 500, 500);
//     e1.y += e1.speed;
//     e2.y += e2.speed;
//     drawBox(e1);
//     drawBox(e2);
// }, 100)


function updateGame() {

    if (!gameon) {
        return;
    }
    window.requestAnimationFrame(() => {
        context.clearRect(0, 0, 500, 500);
        e1.move();
        e2.move();
        e3.move();
        player.move();

        if (isCollided(e1, player) || isCollided(e2, player) || isCollided(e3, player)) {
            gameon = false;
            window.alert("Game over");
            location.reload();
           
        }

        if(player.x >= 500) {
            window.alert("congratulations, you have cleared this level");
            location.reload();
            return
        }
        drawBox(e1);
        drawBox(e2);
        drawBox(e3);
        drawBox(player);
        updateGame();
    })
}

updateGame();






