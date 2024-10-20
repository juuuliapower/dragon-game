const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dragon = { x: 50, y: 200, width: 70, height: 70, dy: 0 }; // Increased size
let gravity = 0.5;
let isJumping = false;
let coin = { x: 300, y: Math.random() * 120 + 80, width: 30, height: 30 }; // Increased size and adjusted height
let backgroundX = 0;
const scrollSpeed = 3;

// Load images
const dragonImg = new Image();
dragonImg.src = 'images/dragon-removebg-preview2.png';

const coinImg = new Image();
coinImg.src = 'images/coin_prev_ui-removebg-preview.png';

const backgroundImg = new Image();
backgroundImg.src = 'images/background5.png';

dragonImg.onload = () => console.log('Dragon image loaded successfully');
dragonImg.onerror = () => console.error('Failed to load dragon image');

coinImg.onload = () => console.log('Coin image loaded successfully');
coinImg.onerror = () => console.error('Failed to load coin image');

backgroundImg.onload = () => console.log('Background image loaded successfully');
backgroundImg.onerror = () => console.error('Failed to load background image');

function update() {
    // Scroll background and coin
    backgroundX -= scrollSpeed;
    coin.x -= scrollSpeed;

    if (backgroundX <= -canvas.width) {
        backgroundX = 0;
    }

    if (coin.x + coin.width < 0) {
        // Generate a new coin when the current one goes off-screen
        coin.x = canvas.width;
        coin.y = Math.random() * 120 + 80; // Adjusted height range
    }

    if (isJumping) {
        dragon.dy -= gravity;
        dragon.y -= dragon.dy;
        if (dragon.y >= 200) {
            dragon.y = 200;
            isJumping = false;
            dragon.dy = 0;
        }
    }

    checkCoinCollision();
    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw scrolling background
    ctx.drawImage(backgroundImg, backgroundX, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, backgroundX + canvas.width, 0, canvas.width, canvas.height);

    // Draw dragon image
    ctx.drawImage(dragonImg, dragon.x, dragon.y, dragon.width, dragon.height);

    // Draw coin image
    ctx.drawImage(coinImg, coin.x, coin.y, coin.width, coin.height);
}

function checkCoinCollision() {
    if (dragon.x < coin.x + coin.width &&
        dragon.x + dragon.width > coin.x &&
        dragon.y < coin.y + coin.height &&
        dragon.y + dragon.height > coin.y) {
        // Coin collected, move it off-screen to trigger new coin generation
        coin.x = -coin.width;
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isJumping) {
        isJumping = true;
        dragon.dy = 10;
    }
});

update();