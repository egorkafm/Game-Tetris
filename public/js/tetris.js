let main = document.querySelector(".main");

let playfield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
];

var gameSpeed = 400;

function drow() {
    let mainInnerHTML = '';
    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                mainInnerHTML += '<div class="cell movingCell"></div>';
            } else if (playfield[y][x] === 2) {
                mainInnerHTML += '<div class="cell fixedCell"></div>';
            } else {
                mainInnerHTML += '<div class="cell"></div>';
            };
        };
    };
    main.innerHTML = mainInnerHTML;
};

function canTetroMoveDown() {
    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                if (y === playfield.length - 1 || playfield[y + 1][x] === 2) {
                    return false;
                };
            };
        };
    };

    return true;
};

function moveTetroDown() {
    if (canTetroMoveDown()) {
        for (let y = playfield.length - 1; y >= 0 ; y--) {
            for (let x = 0; x < playfield[y].length; x++) {
                if (playfield[y][x] === 1) {
                    playfield[y + 1][x] = 1;
                    playfield[y][x] = 0;
                };
            };
        };
    } else {
        fixTetro();
    };
};

//! Двигаем фигурку влево
function canTetroMoveLeft() {
    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                if (x === 0 || playfield[y][x - 1] === 2) {
                    return false;
                };
            };
        };
    };

    return true;
};

function moveTetroLeft() {
    if (canTetroMoveLeft()) {
        for (let y = playfield.length - 1; y >= 0 ; y--) {
            for (let x = 0; x < playfield[y].length; x++) {
                if (playfield[y][x] === 1) {
                    playfield[y][x - 1] = 1;
                    playfield[y][x] = 0;
                };
            };
        };
    };
};

//! Двигаем фигурку вправо
function canTetroMoveRight() {
    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                if (x === playfield[0].length - 1 || playfield[y][x + 1] === 2) {
                    return false;
                };
            };
        };
    };

    return true;
};

function moveTetroRight() {
    if (canTetroMoveRight()) {
        for (let y = playfield.length - 1; y >= 0 ; y--) {
            for (let x = playfield[0].length - 1; x >= 0; x--) {
                if (playfield[y][x] === 1) {
                    playfield[y][x + 1] = 1;
                    playfield[y][x] = 0;
                };
            };
        };
    };
};

function removeFullLines() {
    let canRemoveLine = true;
    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] !== 2) {
                canRemoveLine = false;
            };
        };
        if (canRemoveLine) {
            playfield.splice(y, 1);
        };
    };
};

function fixTetro() {
    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                playfield[y][x] = 2;
            };
        };
    };

    removeFullLines();

    playfield[0] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
    playfield[1] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
};

drow();

document.onkeydown = function(e) {
    if (e.keyCode === 37) {
        moveTetroLeft();
    } else if (e.keyCode === 39) {
        moveTetroRight();
    } else if (e.keyCode === 40) {
        moveTetroDown();
    };
    drow();
};

function startGame() {
    moveTetroDown();
    drow();
    setTimeout(startGame, gameSpeed);
};

setTimeout(startGame, gameSpeed);


