const COLORS = ["red", "green", "yellow", "blue", "purple", "orange", "white"];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}


function triggerSound() {
    const audio = document.getElementById("audio");

    audio.currentTime = 0;
    audio.play();
    setTimeout(() => {
        audio.pause();
    }, 800);
}

const Engine = Matter.Engine,
  Events = Matter.Events,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Composites = Matter.Composites;

const engine = Engine.create();
engine.world.gravity.y = 0;

const canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const render = Render.create({
  element: document.body,
  canvas: canvas,
  engine: engine,
  options: {
    width: canvas.width,
    height: canvas.height,
  },
});
render.options.background = "#000";
render.options.width = canvasWidth;
render.options.height = canvasHeight;
render.options.wireframes = false;

function createWall(x, y, width, height) {
  return Bodies.rectangle(x, y, width, height, {
    isStatic: true,
  });
}

const wallTop = createWall(canvasWidth / 2, 0, canvasWidth, 10);
const wallBottom = createWall(canvasWidth / 2, canvasHeight, canvasWidth, 10);
const wallRight = createWall(canvasWidth, canvasHeight / 2, 10, canvasHeight);
const wallLeft = createWall(0, canvasHeight / 2, 10, canvasHeight);

function createDVDLogo(x, y, witdth, height) {
  const color = COLORS[getRandomInt(0, COLORS.length)];
    
  const logo = Bodies.rectangle(x, y, witdth, height, {
    restitution: 1,
    render: {
      strokeStyle: "#ff0000",
      sprite: {
        texture: `images/dvd_logo_${color}.png`,
        xScale: 0.1,
        yScale: 0.1,
      },
    },
  });
  logo.logoColor = color;
  logo.targetSpeed = getRandomInt(5, 15);
  Body.setVelocity(logo, { x: logo.targetSpeed / Math.sqrt(2), y: logo.targetSpeed / Math.sqrt(2) });
  Body.setMass(logo, 1);
  return logo;
}

const dvdLogos = [
    createDVDLogo(128, 65, 256, 130),
    createDVDLogo(128, canvasHeight - 65, 256, 130),
    createDVDLogo(canvasWidth - 128, 65, 256, 130),
    createDVDLogo(canvasWidth - 128, canvasHeight - 65, 256, 130)
];

Events.on(engine, "afterUpdate", () => {
  
  function speedUp(body) {
    const { x, y } = body.velocity;
    const bodySpeed = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    if (bodySpeed >= body.targetSpeed) {
      return;
    }
    if (x === 0 && y === 0) {
      return;
    }
    Body.setVelocity(body, { x: x * 1.05, y: y * 1.05 });
  }
  for (let logo of dvdLogos) {
    speedUp(logo);
  }
});
Events.on(engine, "collisionEnd", function (event) {
  console.log("collission", event, event.pairs[0].bodyA);
  for (let pair of event.pairs) {
    const bodies = [pair.bodyA, pair.bodyB];
    for (let body of bodies) {
        if (dvdLogos.includes(body)) {
            const colors = ["red", "green", "yellow", "blue", "purple", "orange", "white"];
            let colorIndex = colors.indexOf(body.logoColor);
            colorIndex += 1;
            colorIndex %= colors.length;
            const nextColor = colors[colorIndex];
            body.render.sprite.texture = `images/dvd_logo_${nextColor}.png`;
            body.logoColor = nextColor; 
        }
    }
  }
  triggerSound();
});

Composite.add(engine.world, [
  wallBottom,
  wallTop,
  wallLeft,
  wallRight,
  ...dvdLogos
]);

Render.run(render);

const runner = Runner.create();

Runner.run(runner, engine);
