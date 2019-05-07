class Circle {
    constructor(x, y, radius, color, text, style) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.style = style;
    }
}

let circles = [];

let signs = [];
signs[0] = '开心~';
signs[1] = '讲的真好';
signs[2] = '很happy';
signs[3] = '棒棒的';
signs[4] = '美滋滋';
signs[5] = '蓝瘦香菇';
signs[6] = '太差了吧';
signs[7] = '神奇了';
signs[8] = '唉~~~';
signs[9] = '土包子';
signs[10] = '淡淡的风';
signs[11] = '凉快~';
signs[12] = '淡定~';
signs[13] = 'nice';
signs[14] = '不错哦';
signs[15] = '随便点';
signs[16] = '飘过~~';
signs[17] = '略懂~~';
signs[18] = '~~~~';
signs[19] = '嘿嘿嘿';
let text = [];

let colors = ['#F73859', '#ff4c00', '#77baff', '#ffffff'];
let style = '';

let data = [];
let colour = [4];
data.push(colour);
colour[0] = 0;
colour[1] = 0;
colour[2] = 0;
colour[3] = 0;

let clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

};
let drawCircles = () => {
    clearCanvas();
    for (let i in circles) {
        context.globalAlpha = (Math.random() * 10 + 1) / 5;
        context.beginPath();
        context.arc(circles[i].x, circles[i].y, circles[i].radius, 0, Math.PI * 2);
        context.fillStyle = circles[i].color;
        context.strokeStyle = circles[i].color;
        context.fill();
        context.stroke();
        context.fillStyle = circles[i].style;
        context.font = '25px 微软雅黑';
        context.fillText(circles[i].text, circles[i].x - 40, circles[i].y + 10);
    }
};

let canvasClick = e => {
    let clickX = e.pageX - canvas.offsetLeft;
    let clickY = e.pageY - canvas.offsetTop;
    for (let i in circles) {
        let distanceFromCenter = Math.sqrt(Math.pow(circles[i].x - clickX, 2) + Math.pow(circles[i].y - clickY, 2));
        if (distanceFromCenter <= circles[i].radius) {
            circles[i].radius = 0;
            circles[i].text = '';
            draw(2);

            switch (circles[i].color) {
                case colors[0]:
                    colour[0] += 1;
                    break;
                case colors[1]:
                    colour[1] += 1;
                    break;
                case colors[2]:
                    colour[2] += 1;
                    break;
                case colors[3]:
                    colour[3] += 1;
                    break;
                default:
                    console.log(circles[i].color);
            }
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
    let radius = randomFromTo(56, 81);
    let x = randomFromTo(0, canvas.width);
    let y = randomFromTo(0, canvas.height);
    let color = colors[randomFromTo(0, 3)];
    switch (color) {
        case colors[0]:
            text = signs[randomFromTo(0, 4)];
            style = '#ffffff';
            break;
        case colors[1]:
            text = signs[randomFromTo(5, 9)];
            style = '#ffffff';
            break;
        case colors[2]:
            text = signs[randomFromTo(10, 14)];
            style = '#ffffff';
            break;
        case colors[3]:
            text = signs[randomFromTo(15, 19)];
            style = '#333333';
            break;
    }
    let circle = new Circle(x, y, radius, color, text, style);
    circles.push(circle);
};

$(document).ready(() => {
    canvas = document.getElementById('drawCanvas');
    context = canvas.getContext('2d');
    canvas.onmousedown = canvasClick;

    $(window).resize(resizeCanvas);
    resizeCanvas();
});

let clearCircles = () => {
    circles = [];
};

$('button').click(() => location.reload());

let draw = (x) => {
    for (let i = 0; i < x; i++) {
        addRandomCircle();
    }
    drawCircles();
};

$('#guide').click(() => {
    $('#guide').hide();
    $('.counter').show();
    setTimeout(() => {
        $('.counter').hide();
        draw(10);
        setTimeout(() => {
            // TODO ajax
            console.log(data);
            clearCircles();
            clearCanvas();
            $('input').hide();
            console.log('You did it!');
            $('.egg').show();
        }, 10000);
    }, 2000);
});

$('.egg').click(() => {
    let resultNode = $('.result');
    resultNode.css('z-index', '300');
    let result = Math.floor(Math.random() * 6);
    switch (result) {
        case 0:
            resultNode.append('<img src="img/result/2018111371e71438f378978af185363df0c81249.png" alt="">');
            break;
        case 1:
            resultNode.append('<img src="img/result/2018111303161044b0fc6cd95134fdfbab45e513.png" alt="">');
            break;
        case 2:
            resultNode.append('<img src="img/result/20181113e06a425140769f6bdd45c4d527adcf6e.png" alt="">');
            break;
        case 3:
            resultNode.append('<img src="img/result/2018112104ca7dfcec12b74c686c17665b01d384.png" alt="">');
            break;
        case 4:
            resultNode.append('<img src="img/result/20181121510af8a3c2769b88dfc50aec8e6a9c3f.png" alt="">');
            break;
        case 5:
            resultNode.append('<img src="img/result/2018112112962fe004f7db1766f16ee8459e3255.png" alt="">');
            break;
    }
    $('.btnFunction').show();
});
