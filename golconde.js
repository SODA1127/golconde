class Gentleman {
    constructor(width, height, direction, posX, posY, speed, src) {
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
        this.src = src;
    }

    moveDirection = [-1,1][Math.random()*2|0];

    randomScaleValue = randomOfRange(1, 3)

    randomVelocityValue = randomOfRange(2, 4)

    move() {
        this.posX += Math.sin(this.direction * Math.PI / 2) * this.speed / this.randomVelocityValue * this.moveDirection;
        this.posY += Math.cos(this.direction * Math.PI / 2) * this.speed / this.randomVelocityValue * this.moveDirection;
    }

    draw() {
        canvasContext.rotate(-this.direction)
        let gentlemanImage = new Image();
        gentlemanImage.src = this.src;
        if (this.randomScaleValue == 1) {
            canvasContext.globalAlpha = 0.3;
        } else {
            canvasContext.globalAlpha = 1;
        }
        canvasContext.drawImage(gentlemanImage, this.posX, this.posY, defaultRainWidth * this.randomScaleValue, defaultRainHeight * this.randomScaleValue);
        canvasContext.rotate(+this.direction)
    }
}

let canvas = document.getElementById("canvas")
let canvasContext = canvas.getContext('2d');

let allGentleman = []
let defaultRainWidth = 25
let defaultRainHeight = 75
let maximumRainCount = 100

let maximumRainInitializationInOneFrame = 5

let fps = 60
let gameLoop = () => {
    setInterval(show, 1000 / fps)
}

let show = () => {
    update();
    draw();
}

let update = () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    let rainInitCountInThisFrame = 0
    while (allGentleman.length < maximumRainCount && maximumRainInitializationInOneFrame > rainInitCountInThisFrame) {
        let distanceFromCam = Math.random()
        let gentleman = new Gentleman(
            defaultRainWidth * (2 - distanceFromCam),
            defaultRainHeight * (2 - distanceFromCam),
            Math.random() / 20,
            Math.random() * canvas.width,
            randomOfRange(0, canvas.height),
            (2 - distanceFromCam) * 2,
            `gentleman/${(Math.floor(Math.random() * 6)) + 1}.png`
        )
        allGentleman.push(gentleman);
        rainInitCountInThisFrame++
    }

    for (let i = 0; i < allGentleman.length; i++) {
        let gentleman = allGentleman[i]
        gentleman.move()
        if (gentleman.posY > canvas.height || gentleman.posY < -(defaultRainHeight * gentleman.randomScaleValue) || gentleman.posX > canvas.width || gentleman.posX < -(defaultRainWidth * gentleman.randomScaleValue)) {
            console.log(allGentleman[i].posY)
            allGentleman.splice(i, 1)
        }
    }
}

function randomOfRange(start, end) {
    return Math.floor((Math.random() * (end-start+1)) + start);

}

let draw = () => {
    allGentleman.forEach(gentleman => {
        gentleman.draw()
    })
}

gameLoop()
