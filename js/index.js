function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
}

let circles = [];
let colors = ['#F73859', '#ff4c00', '#77baff', '#ffffff'];

let data = [];
let colour = [4];
data.push(colour);
colour[0] = 0;
colour[1] = 0;
colour[2] = 0;
colour[3] = 0;

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
            draw(2);
            switch (circle.color) {
                case colors[0]:
                    colour[0] += 1;
                    console.log('colors[0] ============= ' + colour[0]);
                    break;
                case colors[1]:
                    colour[1] += 1;
                    console.log('colors[1] ============= ' + colour[1]);
                    break;
                case colors[2]:
                    colour[2] += 1;
                    console.log('colors[2] ============= ' + colour[2]);
                    break;
                case colors[3]:
                    colour[3] += 1;
                    console.log('colors[3] ============= ' + colour[3]);
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
    let color = colors[randomFromTo(0, 3)];
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
});

let clearCanvas = () => {
    circles = [];
    drawCircles();
};

$('button').click(() => location.reload()
);

let draw = (x) => {
    for (let i = 0; i < x; i++) {
        addRandomCircle();
    }
};

$('#guide').click(() => {
    $('#guide').hide();
    $('.counter').show();
    setTimeout(() => {
        $('.counter').hide();
        draw(10);
    }, 2000);
    setTimeout(() => {
        // TODO ajax
        console.log(data);
        clearCanvas();
        $('input').hide();
        console.log('You did it!');
        $('.egg').show();
    }, 12000);
});

$('.egg').click(() => {
    let resultNumber = Math.floor(Math.random() * 5);
    switch (resultNumber) {
        case 0:
            $('#r1').show();
            break;
        case 1:
            $('#r2').show();
            break;
        case 2:
            $('#r3').show();
            break;
        case 3:
            $('#r4').show();
            break;
        case 4:
            $('#r5').show();
            break;
        case 5:
            $('#r6').show();
            break;
        default:
            console.error('You are awesome!');
    }
    $('.btnFunction').show();
});
