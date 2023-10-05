const bgInput = document.getElementById('bgInput');
const fgInput = document.getElementById('fgInput');
const opacityRange = document.getElementById('opacityRange');
const visibilityRange = document.getElementById('visibilityRange');
const bgImage = document.getElementById('bgImage');
const fgImage = document.getElementById('fgImage');

bgInput.addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        bgImage.src = reader.result;
        bgImage.style.display = "block";
    }

    if (file) {
        reader.readAsDataURL(file);
    }
});

fgInput.addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        fgImage.src = reader.result;
        fgImage.style.display = "block";
    }

    if (file) {
        reader.readAsDataURL(file);
    }
});

opacityRange.addEventListener('input', function() {
    fgImage.style.opacity = this.value;
});

visibilityRange.addEventListener('input', function() {
    const value = (1 - this.value) * 50; // Convert the slider value to percentage
    fgImage.style.clipPath = `inset(${value}% ${value}% ${value}% ${value}%)`;
});


const hammer = new Hammer(fgImage);

let scale = 1;
let currentScale = 1;
let posX = 0;
let posY = 0;
let lastPosX = 0;
let lastPosY = 0;

hammer.get('pinch').set({ enable: true });
hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

hammer.on('pinchstart', function(e) {
    currentScale = scale ? scale : 1; // save the current scale as start point
});

hammer.on('pinchmove', function(e) {
    scale = Math.max(1, Math.min(currentScale * e.scale, 5)); // Allow to scale between 1x and 5x
    applyTransform();
});

hammer.on('panmove', function(e) {
    posX = e.deltaX + lastPosX;
    posY = e.deltaY + lastPosY;
    applyTransform();
});

hammer.on('panend', function() {
    lastPosX = posX;
    lastPosY = posY;
});

function applyTransform() {
    fgImage.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}
