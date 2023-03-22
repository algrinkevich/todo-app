const COLORS = ["red", "green", "yellow", "blue", "purple", "orange", "white"];
const LOGO_WIDTH = 2560;
const LOGO_HEIGHT = 1304;
const WALL_THICKNESS = 10;

const Engine = Matter.Engine,
  Events = Matter.Events,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Composites = Matter.Composites;

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

function findLogoScale() {
  const logoRatio = 0.12;
  return (canvas.width * logoRatio) / LOGO_WIDTH;
}

function getLogoWidth() {
  return LOGO_WIDTH * findLogoScale();
}

function getLogoHeight() {
  return LOGO_HEIGHT * findLogoScale();
}

function createDVDLogo(x, y) {
  const color = COLORS[getRandomInt(0, COLORS.length)];
  const logoScale = findLogoScale();
  const width = getLogoWidth();
  const height = getLogoHeight();

  const logo = Bodies.rectangle(x, y, width, height, {
    restitution: 1,
    render: {
      strokeStyle: "#ff0000",
      sprite: {
        texture: `images/dvd_logo_${color}.png`,
        xScale: logoScale,
        yScale: logoScale,
      },
    },
  });

  logo.logoColor = color;
  logo.targetSpeed = getRandomInt(5, 15);
  Body.setVelocity(logo, {
    x: logo.targetSpeed / Math.sqrt(2),
    y: logo.targetSpeed / Math.sqrt(2),
  });
  Body.setMass(logo, 1);
  return logo;
}

function createWall(x, y, width, height) {
  return Bodies.rectangle(x, y, width, height, {
    isStatic: true,
  });
}

function handleCollision(event) {
  for (let pair of event.pairs) {
    const bodies = [pair.bodyA, pair.bodyB];
    for (let body of bodies) {
      if (dvdLogos.includes(body)) {
        const colors = [
          "red",
          "green",
          "yellow",
          "blue",
          "purple",
          "orange",
          "white",
        ];
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
}

function keepSpeed() {
  for (let logo of dvdLogos) {
    const { x, y } = logo.velocity;
    const bodySpeed = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    if (bodySpeed >= logo.targetSpeed) {
      return;
    }
    if (x === 0 && y === 0) {
      return;
    }
    Body.setVelocity(logo, { x: x * 1.05, y: y * 1.05 });
  }
}

function createRender() {
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
  render.options.width = canvas.width;
  render.options.height = canvas.height;
  render.options.wireframes = false;
  return render;
}

const engine = Engine.create();
engine.world.gravity.y = 0;

const canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const render = createRender();

const wallTop = createWall(canvas.width / 2, 0, canvas.width, WALL_THICKNESS);
const wallBottom = createWall(
  canvas.width / 2,
  canvas.height,
  canvas.width,
  WALL_THICKNESS
);
const wallRight = createWall(
  canvas.width,
  canvas.height / 2,
  WALL_THICKNESS,
  canvas.height
);
const wallLeft = createWall(
  0,
  canvas.height / 2,
  WALL_THICKNESS,
  canvas.height
);
const logoWidth = getLogoWidth();
const logoHeight = getLogoHeight();

const dvdLogos = [
  createDVDLogo(logoWidth / 2, logoHeight / 2),
  createDVDLogo(logoWidth / 2, canvas.height - logoHeight / 2),
  createDVDLogo(canvas.width - logoWidth / 2, logoHeight / 2),
  createDVDLogo(canvas.width - logoWidth / 2, canvas.height - logoHeight / 2),
];

Events.on(engine, "afterUpdate", keepSpeed);
Events.on(engine, "collisionEnd", handleCollision);

Composite.add(engine.world, [
  wallBottom,
  wallTop,
  wallLeft,
  wallRight,
  ...dvdLogos,
]);

Render.run(render);

const runner = Runner.create();

Runner.run(runner, engine);
