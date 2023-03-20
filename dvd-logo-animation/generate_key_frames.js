//This script can be used for generating key frames based on the duration along the X and Y axes. 

const COLORS = ['blue', 'yellow', 'red', 'green', 'purple', 'orange', 'fuchsia'];
let X_DURATION = 5;
let Y_DURATION = 4;

let currentTimeSeconds = 0;
let lastXSeconds = 0;
let lastYSeconds = 0;
let colorIndex = 0;
const keyframes = [{
	color: 'blue', 
	seconds: 0
}]; 

function getNextColor() {
	colorIndex += 1;
	colorIndex %= COLORS.length;
	return COLORS[colorIndex];
}

while (true) {
	const nextColor = getNextColor();
	const nextSecondsX = Math.abs(lastXSeconds + X_DURATION);
    const nextSecondsY = Math.abs(lastYSeconds + Y_DURATION);
    const isCycleFound = nextSecondsX === nextSecondsY && nextColor === COLORS[0];

    if (isCycleFound) {
    	currentTimeSeconds = nextSecondsX;
    	break;
    }
    if (nextSecondsX < nextSecondsY) {
    	lastXSeconds = currentTimeSeconds = nextSecondsX;
    } else {
    	lastYSeconds = currentTimeSeconds = nextSecondsY;
    }
    keyframes.push({
    	color: COLORS[colorIndex], 
    	seconds: currentTimeSeconds
    });
}

for (let keyframe of keyframes) {
	console.log(`${keyframe.seconds / currentTimeSeconds * 100}% {
    filter: var(--${keyframe.color})
}`);
}