const cat = document.getElementById("cat");

let x = 200;
let vx = 1.4;
const floorOffset = 12;
let movingRight = true;

let screenW = window.innerWidth;
let screenH = window.innerHeight;

function getCatWidth() {
  return cat.offsetWidth || 300;
}

function getCatHeight() {
  return cat.offsetHeight || 200;
}

function getFloorY() {
  return screenH - getCatHeight() - floorOffset;
}

function move() {
  x += vx;

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

  const y = getFloorY();
  const facingScale = movingRight ? 1 : -1;

  cat.style.transform = `translate(${x}px, ${y}px) scaleX(${facingScale})`;

  requestAnimationFrame(move);
}

move();

window.addEventListener("resize", () => {
  screenW = window.innerWidth;
  screenH = window.innerHeight;

  const maxX = Math.max(0, screenW - getCatWidth());
  x = Math.min(Math.max(0, x), maxX);
});
