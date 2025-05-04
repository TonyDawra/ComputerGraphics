class Sprites {
    constructor() { }
    update() { }
    draw() { }
}
class Bullet extends Sprites {
    constructor(snakeX, snakeY, d) {
        super();
        this.x = snakeX;
        this.y = snakeY;
        this.bulletWidth = 10;
        this.bulletHeight = 10;
        this.direction = d;
    }

    update() {
        if (this.direction == "RIGHT") {
            this.x += 20;
        } else if (this.direction == "LEFT") {
            this.x -= 20;
        } else if (this.direction == "DOWN") {
            this.y += 20;
        } else if (this.direction == "UP") {
            this.y -= 20;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.bulletWidth, this.bulletHeight);
    }
}
class Snake extends Sprites {
    constructor(box) {
        super();
        this.snake = [];
        this.snake[0] = {
            x: 9 * box,
            y: 10 * box
        }
        this.box = box;
        this.score = 0;
        this.secondScore = 0;
        this.thirdScore = 0;
        this.finalScore = 0;

        this.shoot = new Audio("audio/shoot.mp3");
        this.win = new Audio("audio/win.mp3");

        this.dead = new Audio();
        this.eat = new Audio();
        this.up = new Audio();
        this.right = new Audio();
        this.left = new Audio();
        this.down = new Audio();

        this.dead.src = "audio/dead.mp3";
        this.eat.src = "audio/eat.mp3";
        this.up.src = "audio/up.mp3";
        this.right.src = "audio/right.mp3";
        this.left.src = "audio/left.mp3";
        this.down.src = "audio/down.mp3"

        this.d;
        this.paused = false;
        this.muted = false;
        this.lost = false;
        this.isShooting = false;

        document.addEventListener("keydown", (event) => {
            let key = event.keyCode;
            if (key == 37 && this.d != "RIGHT" && !this.paused) {
                this.left.play();
                this.d = "LEFT";
            } else if (key == 38 && this.d != "DOWN" && !this.paused) {
                this.d = "UP";
                this.up.play();
            } else if (key == 39 && this.d != "LEFT" && !this.paused) {
                this.d = "RIGHT";
                this.right.play();
            } else if (key == 40 && this.d != "UP" && !this.paused) {
                this.d = "DOWN";
                this.down.play();
            } else if (key == 32) {
                this.isShooting = true;
                this.shoot.play();
            } else if (key === 80 || key === 112) {
                // Pause the game
                this.paused = true;
            } else if (key === 82 || key === 114) {
                // Resume the game
                this.paused = false;
            } else if (key == 57 || key == 77) {
                this.muted = !this.muted;
                this.dead.muted = this.muted;
                this.eat.muted = this.muted;
                this.up.muted = this.muted;
                this.right.muted = this.muted;
                this.left.muted = this.muted;
                this.down.muted = this.muted;
                this.shoot.muted = this.muted;
            }
        });

    }
    collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }
    collisionObstacles1(snakeX, snakeY) {
        if ((snakeX == 5 * this.box && snakeY == 6 * this.box) || (snakeX == 6 * this.box && snakeY == 6 * this.box) || (snakeX == 5 * this.box && snakeY == 7 * this.box) || (snakeX == 5 * this.box && snakeY == 8 * this.box) || (snakeX == 13 * this.box && snakeY == 12 * this.box) || (snakeX == 13 * this.box && snakeY == 13 * this.box) || (snakeX == 13 * this.box && snakeY == 14 * this.box) || (snakeX == 12 * this.box && snakeY == 14 * this.box)) {

            return true;

        } else { return false; }

    }
    collisionObstacles2(snakeX, snakeY) {
        if ((snakeX == 5 * this.box && snakeY == 12 * this.box) || (snakeX == 5 * this.box && snakeY == 13 * this.box) || (snakeX == 5 * this.box && snakeY == 14 * this.box) || (snakeX == 6 * this.box && snakeY == 14 * this.box) || (snakeX == 12 * this.box && snakeY == 6 * this.box) || (snakeX == 13 * this.box && snakeY == 6 * this.box) || (snakeX == 13 * this.box && snakeY == 7 * this.box) || (snakeX == 13 * this.box && snakeY == 8 * this.box) || (snakeX == 13 * this.box && snakeY == 18 * this.box)) {

            return true;

        } else { return false; }
    }
    update() {
        if (this.paused) {
            return;
        }
        let snakeX = this.snake[0].x;
        let snakeY = this.snake[0].y;

        if (this.d == "LEFT") snakeX -= this.box;
        if (this.d == "UP") snakeY -= this.box;
        if (this.d == "RIGHT") snakeX += this.box;
        if (this.d == "DOWN") snakeY += this.box;

        if (snakeX == food.food.x && snakeY == food.food.y) {
            this.score++;
            if (this.score > 5) {
                this.secondScore++;
                if (this.secondScore > 10) { this.thirdScore++; }
            }
            this.eat.play();
            food.food = {
                x: Math.floor(Math.random() * 17 + 1) * this.box,
                y: Math.floor(Math.random() * 15 + 3) * this.box
            }
            while (this.collisionObstacles1(food.x, food.y) || this.collisionObstacles2(food.x, food.y)) {
                food.food = {
                    x: Math.floor(Math.random() * 17 + 1) * this.box,
                    y: Math.floor(Math.random() * 15 + 3) * this.box
                }
            }
            // we don't remove the tail
        } else {
            // remove the tail
            this.snake.pop();
        }
        if (this.isShooting) {
            game.addSprite(new Bullet(snakeX, snakeY, this.d));
            this.isShooting = false;
        }

        let newHead = {
            x: snakeX,
            y: snakeY
        }

        // game over

        if (snakeX < this.box ||
            snakeX > 17 * this.box ||
            snakeY < 3 * this.box ||
            snakeY > 17 * this.box ||
            this.collision(newHead, this.snake)) {
            game.gameOver();
            clearInterval(gameInterval);
            this.dead.play();
            game.reset();

        }
        if (this.score >= 5) {
            if (this.collisionObstacles1(snakeX, snakeY)) {
                game.gameOver();
                clearInterval(gameInterval);
                this.dead.play();
                game.reset();

            }
        }
        if (this.secondScore >= 10) {
            if (this.collisionObstacles1(snakeX, snakeY) || this.collisionObstacles2(snakeX, snakeY)) {
                game.gameOver();
                clearInterval(gameInterval);
                this.dead.play();
                game.reset();

            }
        }
        if (this.thirdScore == 10) {
            clearInterval(gameInterval);
            this.win.play();
            game.gameWin();
            game.reset();
        }
        this.snake.unshift(newHead);
    }
    getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    draw(ctx) {

        if (this.paused) {
            // Display a pause message
            ctx.fillStyle = "blue";
            ctx.font = "45px Changa one";
            ctx.fillText("Paused\t Press r to resume", 608 / 2 - 220, 608 / 2);
            return;
        }
        for (let i = 0; i < this.snake.length; i++) {
            ctx.fillStyle = (i == 0) ? this.getRandomColor() : this.getRandomColor();
            ctx.fillRect(this.snake[i].x, this.snake[i].y, this.box, this.box);

            ctx.strokeStyle = "red";
            ctx.strokeRect(this.snake[i].x, this.snake[i].y, this.box, this.box);
        }
        if (this.muted) {
            ctx.fillStyle = "blue";
            ctx.font = "30px Changa one";
            ctx.fillText("muted press m to unmute", 608 / 2 - 220, 608 - 10);
        }

    }
}
class Food extends Sprites {
    constructor(box) {
        super();
        this.foodImg = new Image();
        this.foodImg.src = "img/food.png";
        this.food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }

        this.box = box;
    }
    update() {

    }
    draw(ctx) {
        ctx.drawImage(this.foodImg, this.food.x, this.food.y);
    }
}
class Game {
    constructor() {
        this.canvas = document.getElementById("snake");
        this.ctx = this.canvas.getContext("2d");

        this.ground = new Image();
        this.ground.src = "img/ground.png";

        this.sprites = [];
        this.box = 32;

    }
    update() {
        for (let i = 0; i < this.sprites.length; i++) {
            this.sprites[i].update();
        }

    }
    addSprite(pSprite) {
        this.sprites.push(pSprite);
    }
    reset() {
        clearInterval(gameInterval);
        clearInterval(instructionsInterval);

        let newSnake = new Snake(this.box);
        let newFood = new Food(this.box);

        this.sprites = [newSnake, newFood];
        snake = newSnake;
        food = newFood;

        gameInterval = setInterval(() => this.animate(), 200);
        instructionsInterval = setInterval(() => instructions.animate(), 200);

    }
    gameOver() {
        this.ctx.fillStyle = "black";
        this.ctx.font = "40px Changa one";
        this.ctx.fillText("Game Over ", 608 / 2 - 100, 608 / 2 - 100);
    }
    gameWin() {
        this.ctx.fillStyle = "black";
        this.ctx.font = "40px Changa one";
        this.ctx.fillText("WON ", 608 / 2 - 50, 608 / 2 - 100);

    }

    draw(ctx) {
        this.ctx.font = "40px Changa one";
        this.ctx.fillText(`press any arrow to start the game`, 45, 250);
        if (snake.d == "LEFT" || snake.d == "UP" || snake.d == "RIGHT" || snake.d == "DOWN") {

            this.ctx.drawImage(this.ground, 0, 0);
            for (let i = 0; i < this.sprites.length; i++) {
                this.sprites[i].draw(this.ctx);
            }


            if (snake.score >= 5) {
                this.ctx.fillStyle = "blue";
                this.ctx.font = "45px Changa one";
                this.ctx.fillText("5/5", 2 * this.box, 1.6 * this.box);
                this.ctx.fillStyle = "#16510e"
                this.ctx.fillRect(5 * this.box, 6 * this.box, this.box, 3 * this.box);
                this.ctx.fillRect(5 * this.box, 6 * this.box, 2 * this.box, this.box);
                this.ctx.fillRect(12 * this.box, 14 * this.box, 2 * this.box, this.box);
                this.ctx.fillRect(13 * this.box, 12 * this.box, this.box, 3 * this.box);


                if (snake.secondScore >= 10) {
                    this.ctx.fillStyle = "red";
                    this.ctx.font = "45px Changa one";
                    this.ctx.fillText("5/5", 2 * this.box, 1.6 * this.box);
                    this.ctx.fillText("10/10", 7 * this.box, 1.6 * this.box);
                    this.ctx.fillText(snake.thirdScore + "/10", 11 * this.box, 1.6 * this.box);
                    this.ctx.fillStyle = "#16510e"
                    this.ctx.fillRect(12 * this.box, 6 * this.box, 2 * this.box, this.box);
                    this.ctx.fillRect(13 * this.box, 6 * this.box, this.box, 3 * this.box);
                    this.ctx.fillRect(5 * this.box, 12 * this.box, this.box, 3 * this.box);
                    this.ctx.fillRect(5 * this.box, 14 * this.box, 2 * this.box, this.box);

                }
                if (snake.secondScore < 10) {
                    this.ctx.fillStyle = "blue";
                    this.ctx.fillText(snake.secondScore + "/10", 7 * this.box, 1.6 * this.box);
                }




            } else {
                this.ctx.fillStyle = "blue";
                this.ctx.font = "45px Changa one";
                this.ctx.fillText(snake.score + "/5", 2 * this.box, 1.6 * this.box);
            }
        }
        this.canvas.style.border = '7px solid green';
    }

    animate() {
        this.draw();
        this.update();

    }
}
class Instruction {
    constructor() {
        this.canvas2 = document.getElementById("instructions");
        this.ctx2 = this.canvas2.getContext("2d");

        var coinSpritesheet = new Image();
        coinSpritesheet.src = "img/coinSpritesheet.png";
        this.spritesheet = coinSpritesheet;
        this.x = 100;
        this.y = 320;
        this.width = 566;
        this.height = 441;
        this.timePerFrame = 90;
        this.numberOfFrames = 9 || 1;
        this.frameIndex = 0;
        this.lastUpdate = Date.now();

        this.spritesheet.onload = () => {
           
            this.animate();
    }
}
    drawInstructions() {
        this.canvas2.style.border = '7px solid green';
        this.ctx2.font = "45px Changa one";
        this.ctx2.fillText("Instructions", 50, 40);
        this.ctx2.font = "20px Changa one";
        this.ctx2.fillText("-Use arrow keys to move the snake.", 3, 90);
        this.ctx2.fillText("-Eat apples to grow and increase ", 3, 130);
        this.ctx2.fillText("your score until u win.", 5, 150);
        this.ctx2.fillText("-Avoid hitting yourself or walls or ", 3, 190);
        this.ctx2.fillText("obstacles!", 5, 210);
        this.ctx2.fillText("-Press p to pause game.", 3, 250);
        this.ctx2.fillText("-Press r to resume game.", 3, 290);
        this.ctx2.fillText("-Press m to mute.", 3, 330);
        this.ctx2.fillText("-Press spacebar to shoot.", 3, 370);
        this.ctx2.fillText("-After loosing, reset game , start ", 3, 410);
        this.ctx2.fillText("playing if u press any arrow.", 5, 430);
        this.ctx2.fillText("-Win this prize", 3, 470);
        this.ctx2.clearRect(0, 480, this.canvas2.width, this.canvas2.height);
        this.ctx2.drawImage(this.spritesheet,
            this.frameIndex * this.width / this.numberOfFrames,
            0,
            this.width / this.numberOfFrames,
            this.height,
            this.x,
            this.y,
            this.width / this.numberOfFrames,
            this.height);
        this.ctx2.fillText("Tony Dawra", 100, 600);

    }
    update(){
        if (Date.now() - this.lastUpdate >= this.timePerFrame) {
            this.frameIndex++;
            if (this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
            this.lastUpdate = Date.now();
        }
    }
    animate() {
        this.drawInstructions();
        this.update();


    }

}
class Story{
    constructor(){
        this.canvas3= document.getElementById("story");
        this.ctx3 = this.canvas3.getContext("2d");
    }
    draw(){
        this.canvas3.style.border = '7px solid green';
        this.ctx3.font = "30px Changa one";
        this.ctx3.fillText("Story:", 5, 30);
        this.ctx3.font = "15px Changa one";
        this.ctx3.fillText("after his birth the snake faced very serious discrimination because he was very small and colorful, everyone bullied him until one morning", 80, 30);
        this.ctx3.fillText("he was kick out of the group pack even his family didn’t defend him, he was kicked out because another group pack came and attack attack this pack ", 5, 50);
        this.ctx3.fillText("and he could not do anything of how small he was.The snake was devastated he was walking through the jungle all alone small and colorful until he saw", 5, 70);
        this.ctx3.fillText("a statue in the middle of the jungle it was a statue of a huge sunbeam snake made of different colors of rock he saw something in that statue that it made", 5, 90);
        this.ctx3.fillText("him attracted to it he goes closer when he touched it, when he did, it teleported him to another world where the gods told him if u want your revenge you", 5, 110);
        this.ctx3.fillText("have to eat has many apple as you can to be as big and take your revenge he without any question started eating the apples to get bigger and get his", 5, 130);
        this.ctx3.fillText("revenge,but it was not easy because every time he eat it became harder and harder.", 5, 145);

       
    }
    animate(){
        this.draw();
    }
}
var game = new Game();
var instructions = new Instruction();
var story=new Story();
let snake = new Snake(game.box);
let food = new Food(game.box);
game.addSprite(snake);
game.addSprite(food);
var gameInterval = setInterval(() => game.animate(), 200);
var instructionsInterval = setInterval(() => instructions.animate(), 200);
var storyInterval = setInterval(() => story.animate(), 200);
