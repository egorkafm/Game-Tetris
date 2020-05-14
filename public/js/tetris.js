let main = document.querySelector(".main");
const scoreElem = document.getElementById('score');
const levelElem = document.getElementById('level');

let playfield = [
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let score = 0;
let currentLevel = 1;
let possibleLevels = {
    1: {
        scorePerLine: 10,
        speed: 400,
        nextLevelScore: 50,
    },
    2: {
        scorePerLine: 15,
        speed: 300,
        nextLevelScore: 500,
    },
    3: {
        scorePerLine: 20,
        speed: 200,
        nextLevelScore: 1000,
    },
    4: {
        scorePerLine: 30,
        speed: 100,
        nextLevelScore: 2000,
    },
    5: {
        scorePerLine: 50,
        speed: 50,
        nextLevelScore: Infinity,
    },
};



let activeTetro = {
    x: 0,
    y: 0,
    shape: [ 
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ],
};


let figures = {
    O: [
        [1, 1],
        [1, 1],
    ],
    I: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ],
    S: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    Z: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    L: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    J: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    T: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
    ],
};

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

function removePreActiveTetro() {
    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                playfield[y][x] = 0;
            };
        };
    };
};

function addActiveTetro() {
    removePreActiveTetro();
    for (let y = 0; y < activeTetro.shape.length; y++) {
        for (let x = 0; x < activeTetro.shape[y].length; x++) {
            if (activeTetro.shape[y][x] === 1) {
                playfield[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x];
            };
        };
    };
};

function rotateTetro() {
    const prevTetroState = activeTetro.shape;

    activeTetro.shape = activeTetro.shape[0].map((val, index) =>
        activeTetro.shape.map((row) => row[index]).reverse()
    );
    
    if (hasCollisions()) {
        activeTetro.shape = prevTetroState;
    };
};

function hasCollisions() {
    for (let y = 0; y < activeTetro.shape.length; y++) {
        for (let x = 0; x < activeTetro.shape[y].length; x++) {
            if (activeTetro.shape[y][x] && (playfield[activeTetro.y + y] === undefined || 
                playfield[activeTetro.y + y][activeTetro.x + x] === undefined ||
                playfield[activeTetro.y + y][activeTetro.x + x] === 2)) {
                return true;
            };
        };
    };
    return false;
};

/* //! Двигаем фигурку вниз
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
}; */

/* //! Двигаем фигурку влево
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
}; */

/* //! Двигаем фигурку вправо
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
}; */

function removeFullLines() {
    let canRemoveLine = true,
        filledLines = 0;
    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] !== 2) {
                canRemoveLine = false;
                break;
            };
        };
        if (canRemoveLine) {
            playfield.splice(y, 1);
            playfield.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            filledLines += 1;
        };
        canRemoveLine = true;
    };

    switch (filledLines) {
        case 1:
            score += 10;
            break;
        case 2:
            score += 10 * 3;
            break;
        case 3:
            score += 10 * 6;
            break;
        case 4:
            score += 10 * 12;
            break;
    };

    scoreElem.innerHTML = score;

    if (score >= possibleLevels[currentLevel].nextLevelScore) {
        currentLevel++;
        levelElem.innerHTML = currentLevel;
    };
};

function getNewTetro() {
    const possibleFigures = 'IOLJTSZ';
    const rand = Math.floor(Math.random() * 7);
    return figures[possibleFigures[rand]];
};

function fixTetro() {
    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                playfield[y][x] = 2;
            };
        };
    };
};

function moveTetroDown() {
    activeTetro.y += 1;
    if (hasCollisions()) {
        activeTetro.y -= 1;
        fixTetro();
        removeFullLines();
        activeTetro.shape = getNewTetro();
        activeTetro.x = Math.floor((10 - activeTetro.shape[0].length)/2);
        activeTetro.y = 0;
    };
};

document.onkeydown = function(e) {
    if (e.keyCode === 37) {
        activeTetro.x -= 1;
        if (hasCollisions()) {
            activeTetro.x += 1;
        };
    } else if (e.keyCode === 39) {
        activeTetro.x += 1;
        if (hasCollisions()) {
            activeTetro.x -= 1;
        };
    } else if (e.keyCode === 40) {
        moveTetroDown();
    } else if (e.keyCode === 38) {
        rotateTetro();
    };

    addActiveTetro();
    drow();
};

scoreElem.innerHTML = score;
levelElem.innerHTML = currentLevel;

addActiveTetro();
drow();

function startGame() {
    moveTetroDown();
    addActiveTetro();
    drow();
    setTimeout(startGame, possibleLevels[currentLevel].speed);
};

setTimeout(startGame, possibleLevels[currentLevel].speed);

