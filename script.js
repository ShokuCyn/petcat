const cat = document.getElementById("cat");

let x = 200;
let y = 200;
let vx = 0.4;
let vy = 0.3;

let screenW = window.innerWidth;
let screenH = window.innerHeight;

function move() {
  x += vx;
  y += vy;

  if (x <= 0 || x >= screenW - 300) vx *= -1;
  if (y <= 0 || y >= screenH - 200) vy *= -1;

  cat.style.transform = `translate(${x}px, ${y}px)`;

  requestAnimationFrame(move);
}

move();

window.addEventListener("resize", () => {
  screenW = window.innerWidth;
  screenH = window.innerHeight;
});

function randomPause() {
  const originalVX = vx;
  const originalVY = vy;

  vx = 0;
  vy = 0;

  setTimeout(() => {
    vx = originalVX;
    vy = originalVY;
  }, 2000 + Math.random() * 3000);
}

setInterval(() => {
  if (Math.random() < 0.2) {
    randomPause();
  }
}, 5000);