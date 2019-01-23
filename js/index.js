function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
}

let circles = [];
let colors = ['#F73859', '#ff4c00', '#77baff', '#ffffff', '#000000'];
let color0 = 0;
let color1 = 0;
let color2 = 0;
let color3 = 0;
let color4 = 0;

let drawCircles = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        context.globalAlpha = (Math.random() * 10 + 1) / 10;
        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        context.fillStyle = circle.color;
        context.strokeStyle = circle.color;
        context.fill();
        context.stroke();
    }
};

let canvasClick = e => {
    let clickX = e.pageX - canvas.offsetLeft;
    let clickY = e.pageY - canvas.offsetTop;
    for (let i = circles.length - 1; i >= 0; i--) {
        let circle = circles[i];
        let distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2));
        if (distanceFromCenter <= circle.radius) {
            circle.radius = 0;
            switch (circle.color) {
                case colors[0]:
                    color0 += 1;
                    console.log('colors[0] ============= ' + color0);
                    break;
                case colors[1]:
                    color1 += 1;
                    console.log('colors[1] ============= ' + color1);
                    break;
                case colors[2]:
                    color2 += 1;
                    console.log('colors[2] ============= ' + color2);
                    break;
                case colors[3]:
                    color3 += 1;
                    console.log('colors[3] ============= ' + color3);
                    break;
                case colors[4]:
                    color4 += 1;
                    console.log('colors[4] ============= ' + color4);
                    break;
                default:
                    console.log(circle.color);
            }
            drawCircles();
        }
    }
};

let canvas;
let context;

let resizeCanvas = () => {
    $('#drawCanvas').attr('width', $(window).get(0).innerWidth).attr('height', $(window).get(0).innerHeight);
    drawCircles();
};

let randomFromTo = (from, to) => {
    return Math.floor(Math.random() * (to - from + 1) + from);
};

let addRandomCircle = () => {
    let radius = randomFromTo(49, 81);
    let x = randomFromTo(0, canvas.width);
    let y = randomFromTo(0, canvas.height);
    let color = colors[randomFromTo(0, 4)];
    let circle = new Circle(x, y, radius, color);
    circles.push(circle);
    drawCircles();
};

$(document).ready(() => {
    canvas = document.getElementById('drawCanvas');
    context = canvas.getContext('2d');
    canvas.onmousedown = canvasClick;

    $(window).resize(resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < 10; i++) {
        addRandomCircle();
    }
});

let clearCanvas = () => {
    circles = [];
    drawCircles();
};

setTimeout(() => {
    clearCanvas();
    $('input').hide();
    console.log('You did it!');
    $('.egg').show();
}, 10000);
