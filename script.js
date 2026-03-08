const cat = document.getElementById("cat");

let x = 200;
let vx = 1.4;
const floorOffset = 12;
let movingRight = true;

const jumpAmplitude = 14;
const jumpSpeed = 0.01;
let jumpPhase = 0;

let pauseUntil = 0;
let nextBehaviorChangeAt = performance.now() + randomRange(1800, 4200);
let lastFrameTime = performance.now();

let screenW = window.innerWidth;
let screenH = window.innerHeight;

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function getCatWidth() {
  return cat.offsetWidth || 300;
}

function getCatHeight() {
  return cat.offsetHeight || 200;
}

function getFloorY() {
  return screenH - getCatHeight() - floorOffset;
}

function randomBehavior(now) {
  const roll = Math.random();

  if (roll < 0.4) {
    pauseUntil = now + randomRange(1200, 3200);
  }

  if (roll >= 0.4 || Math.random() < 0.6) {
    vx *= -1;
    movingRight = vx > 0;
  }

  nextBehaviorChangeAt = now + randomRange(1800, 4200);
}

function move(now) {
  const delta = now - lastFrameTime;
  lastFrameTime = now;
  if (now >= nextBehaviorChangeAt) {
    randomBehavior(now);
  }

  const isPaused = now < pauseUntil;

  if (!isPaused) {
    x += vx;
  }

  const maxX = screenW - getCatWidth();

  if (x <= 0) {
    x = 0;
    vx = Math.abs(vx);
    movingRight = true;
  } else if (x >= maxX) {
    x = maxX;
    vx = -Math.abs(vx);
    movingRight = false;
  }

  const floorY = getFloorY();

  if (!isPaused) {
    jumpPhase += jumpSpeed * delta;
  }

  const jumpOffset = isPaused ? 0 : Math.max(0, Math.sin(jumpPhase)) * jumpAmplitude;
  const y = floorY - jumpOffset;
  const facingScale = movingRight ? 1 : -1;

  cat.style.transform = `translate(${x}px, ${y}px) scaleX(${facingScale})`;

  requestAnimationFrame(move);
}

requestAnimationFrame(move);

window.addEventListener("resize", () => {
  screenW = window.innerWidth;
  screenH = window.innerHeight;

  const maxX = Math.max(0, screenW - getCatWidth());
  x = Math.min(Math.max(0, x), maxX);
});
