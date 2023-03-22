
const Engine = Matter.Engine,
    Events = Matter.Events,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites;
const canvasWidth = document.body.offsetWidth;
const canvasHeight = document.body.offsetHeight;

const engine = Engine.create();
engine.world.gravity.y = 0;


const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: canvasWidth,
        height: canvasHeight
    }
    
});
render.options.background = '#ffffff';
render.options.width = canvasWidth;
render.options.height = canvasHeight;
render.options.wireframes = false

const wallTop = Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, 10, {
    isStatic: true
});
const wallBottom = Bodies.rectangle(
    canvasWidth / 2,
    canvasHeight,
    canvasWidth,
    10,
    {
        isStatic: true
    }
);
const wallRight = Bodies.rectangle(
    canvasWidth,
    canvasHeight / 2,
    10,
    canvasHeight,
    {
        isStatic: true
    }
);
const wallLeft = Bodies.rectangle(0, canvasHeight / 2, 10, canvasHeight, {
    isStatic: true
});

const boxA = Bodies.rectangle(128, 65, 256, 130, {
    restitution: 1,
    render: {
        strokeStyle: '#ff0000',
        sprite: {
            texture: 'dvd_logo.png',
            xScale: 0.1,
            yScale: 0.1
        }
    }
});

const boxB = Bodies.rectangle(128, canvasHeight - 75, 256, 130, {
    restitution: 1,
    render: {
        strokeStyle: '#ff0000',
        sprite: {
            texture: 'dvd_logo.png',
            xScale: 0.1,
            yScale: 0.1
        },
        
    }});
Body.setVelocity(boxA, { x: 10, y: 10});
Body.setVelocity(boxB, { x: 10, y: -10});
Body.setMass(boxA, 1);
Body.setMass(boxB, 1);
Events.on(engine, "afterUpdate", (event) => {
    const targetSpeed = 10;
    function speedUp(body) {
        const {x, y} = body.velocity;
        const bodySpeed = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        if (bodySpeed >= targetSpeed) {
            return;
        }
        if (x === 0 && y === 0) {
            return;
        }
        Body.setVelocity(body, {x: x * 1.05, y: y * 1.05})
    }
    speedUp(boxA);
    speedUp(boxB);
});
Events.on(engine, 'collisionStart', function (event) {
    console.log('collission', event, event.pairs[0].bodyA);
});

Composite.add(engine.world, [wallBottom, wallTop, wallLeft, wallRight, boxA, boxB]);

Render.run(render);

const runner = Runner.create();

Runner.run(runner, engine);









