var canvas;
var video;
var poseNet;
var nariz;

const larg = 400;
const alt = 300;

let narizURL = './nariz/nariz4.png';
const nLA = 120;
const narizLarg = nLA;
const narizAlt = nLA;

var noseX = (larg/2) - (narizLarg/2);
var noseY = (alt/2) - (narizAlt/2);

setButtons();

function preload() {
    nariz = loadImage(narizURL);
}

function setup() {
    canvas = createCanvas(larg, alt);
    canvas.center()
    // camera
    video = createCapture(VIDEO);
    video.size(larg, alt);
    video.hide();
    // poseNet
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, larg, alt)
    //nariz
    image(nariz, noseX, noseY, narizAlt, narizLarg)
}

function takeSnapshot() {
    save('ibagem.png')
}

function modelLoaded() {
    console.log("PoseNet Inicializado")
}

function gotPoses(results) {
    if (results.length > 0) {
        // console.log(results);
        console.log(results[0].pose.nose);
        
        noseX = results[0].pose.nose.x - (narizLarg/2);
        noseY = results[0].pose.nose.y - (narizAlt/2);
    }
}

function setButtons() {
    const divBotao = document.getElementById("divNarizes");
    for (let i = 1; i <= 6; i++) {
        const url = './nariz/nariz' + i + '.png';
        const botao = document.createElement("button");
        botao.id = 'nariz' + i
        botao.style.background = "url(" + url + ")"
        botao.style.backgroundSize = "cover"
        botao.style.width = '80px'
        botao.style.height = '80px'
        botao.className = "btn mx-1"
        botao.setAttribute("onclick", "changeNose(this.id)")
        divBotao.appendChild(botao);
    }
}

function changeNose(nariz) {
    narizURL = './nariz/' + nariz + '.png';
    preload();
}