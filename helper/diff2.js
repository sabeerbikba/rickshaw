let isAnimating = true;
let clear;
const LIGHT_TOGGLE_INTERVAL = 500; //
const BLINKING_DURATION = 4000;

const gallery = document.querySelector('.nav-a'); // *
const hammertime = new Hammer(document.body);
const indicatorLights = document.querySelectorAll('#indicator-light'); // Assuming IDs for indicator lights

hammertime.on('swiperight', (event) => {
    if (isAnimating) {
        isAnimating = false;
        event.preventDefault();
        gallery.classList.add('lightAnime');

        let startTime = Date.now();
        clear = setInterval(() => {
            const elapsedTime = Date.now() - startTime;

            if (elapsedTime >= BLINKING_DURATION) {
                indicatorLights[1].style.display = 'none';
                clearInterval(clear);
                return;
            }

            toggleIndicatorLight(1);
        }, LIGHT_TOGGLE_INTERVAL);
    }
});

hammertime.on('swipeleft', (event) => {
    if (isAnimating) {
        isAnimating = false;
        event.preventDefault();
        gallery.classList.add('lightAnime');

        let startTime = Date.now();
        clear = setInterval(() => {
            const elapsedTime = Date.now() - startTime;

            if (elapsedTime >= BLINKING_DURATION) {
                indicatorLights[1].style.display = 'none';
                clearInterval(clear);
                return;
            }

            toggleIndicatorLight(1);
        }, LIGHT_TOGGLE_INTERVAL);
    }
});

hammertime.on('swipeend', () => {
    gallery.classList.remove('lightAnime');
    clearInterval(clear);
});

function toggleIndicatorLight(index) { //
    if (index === 0) {
        indicatorLights[0].style.display = (indicatorLights[0].style.display === 'none') ? 'block' : 'none';
    } else {
        indicatorLights[1].style.display = (indicatorLights[1].style.display === 'none') ? 'block' : 'none';
    }
}