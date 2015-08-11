/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />


/// <reference path="constants.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/scoreboard.ts" />
/// <reference path="objects/superman.ts" />
/// <reference path="objects/points.ts" />
/// <reference path="objects/cloud.ts" />
/// <reference path="objects/cloud1.ts" />
/// <reference path="objects/cloud2.ts" />
/// <reference path="objects/cloud3.ts" />
/// <reference path="objects/cloud4.ts" />
/// <reference path="objects/kryptonite.ts" />
/// <reference path="objects/buildings2.ts" />
/// <reference path="objects/buildings3.ts" />
/// <reference path="objects/buildings1.ts" />
/// <reference path="objects/ocean.ts" />
/// <reference path="objects/sunmoon.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="objects/label.ts" />

/// <reference path="states/gameplay.ts" />
/// <reference path="states/gameover.ts" />
/// <reference path="states/menu.ts" />


// Global game Variables
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;
var currentScore = 0;
var highScore = 0;


// Game State Variables
var currentState: number;
var currentStateFunction: any;
var stateChanged: boolean = false;

var gamePlay: states.GamePlay;
var gameOver: states.GameOver;
var menu: states.Menu;

var manifest = [
    { id: "cloud", src: "assets/images/cloud_4.png" },
    { id: "cloud1", src: "assets/images/cloud_1.png" },
    { id: "cloud2", src: "assets/images/cloud_2.png" },
    { id: "cloud3", src: "assets/images/cloud_3.png" },
    { id: "cloud4", src: "assets/images/cloud_5.png" },
    { id: "kryptonite", src: "assets/images/kryptonite.png" },
    { id: "buildings2", src: "assets/images/buildings2.png" },
    { id: "buildings3", src: "assets/images/buildings3.png" },
    { id: "buildings1", src: "assets/images/buildings1.png" },
    { id: "points", src: "assets/images/s-logo.png" },
    { id: "ocean", src: "assets/images/dat-to-night.png" },
    { id: "sunmoon", src: "assets/images/sunmoon.png" },
    { id: "superman", src: "assets/images/superman.png" },
    { id: "playButton", src: "assets/images/start.png" },
    { id: "tryAgainButton", src: "assets/images/playagain.png" },
    { id: "engine", src: "assets/audio/superman.mp3" },
    { id: "pup", src: "assets/audio/powerup.mp3" },
    { id: "krypto", src: "assets/audio/kryptonite.mp3" }
];


function Preload() {
    assetLoader = new createjs.LoadQueue(); // create a new preloader
    assetLoader.installPlugin(createjs.Sound); // need plugin for sounds
    assetLoader.on("complete", init, this); // when assets finished preloading - then init function

    assetLoader.loadManifest(manifest);
}


function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    currentState = constants.MENU_STATE;
    changeState(currentState);
}

function gameLoop() {


    if (stateChanged) {
        changeState(currentState);
        stateChanged = false;
    }
    else {
        currentStateFunction.update();
    }
}


function changeState(state: number): void {
    // Launch Various "screens"
    switch (state) {
        case constants.MENU_STATE:
            // instantiate menu screen
            menu = new states.Menu();
            currentStateFunction = menu;
            break;

        case constants.PLAY_STATE:
            // instantiate game play screen
            gamePlay = new states.GamePlay();
            currentStateFunction = gamePlay;
            break;

        case constants.GAME_OVER_STATE:
            // instantiate game over screen
            gameOver = new states.GameOver();
            currentStateFunction = gameOver;
            break;
    }
}






