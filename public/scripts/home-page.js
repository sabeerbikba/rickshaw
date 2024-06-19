let borderTop;
let isAnimating = true;
let animationInterval;

const LIGHT_TOGGLE_INTERVAL = 500;
const BLINKING_DURATION = 4000;

const breakElement = document.getElementById('break');
const breakLights = document.querySelectorAll('#break-light');
const breakOffIndicators = document.querySelectorAll('#break-remove');
const indicatorElements = document.querySelectorAll('.indicator');
const indicatorLights = document.querySelectorAll('#indicator-light');
const indicatorOffIndicators = document.querySelectorAll('#indicator-remove');
const navLogoDiv = document.querySelector('.nav-logo-div');
const btnDiv = document.querySelector('.btn-div');
const phoneNumber = "918970517155";

const gallery = document.querySelector('.gallery');
const hammertime = new Hammer(document.body);

function handleSwipe(event) {
   if (isAnimating) {
      isAnimating = false;
      event.preventDefault();
      gallery.classList.add('animate-light');

      gallery.style.borderTop = '3.6px solid darkred';
      setTimeout(() => {
         gallery.style.borderTop = 'none';
      }, 2000);

      let startTime = Date.now();
      animationInterval = setInterval(() => {
         const elapsedTime = Date.now() - startTime;

         if (elapsedTime >= BLINKING_DURATION) {
            indicatorLights[1].style.display = 'none';
            clearInterval(animationInterval);
            return;
         }

         toggleIndicatorLight(1);
      }, LIGHT_TOGGLE_INTERVAL);
   }
}

hammertime.on('swiperight', handleSwipe);
hammertime.on('swipeleft', handleSwipe);

hammertime.on('swipeend', () => {
   gallery.classList.remove('animate-light');
   clearInterval(animationInterval);
});

function getUrlParameter(name) {
   name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
   var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
   var results = regex.exec(location.search);
   return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

if (getUrlParameter('tourClicked') === 'true') {
   breakElement.classList.add('spongeAnimation');
}

function isMobileDevice() {
   const userAgent = navigator.userAgent;
   return (typeof window.orientation !== "undefined") ||
      (userAgent.indexOf('Mobile') !== -1) ||
      (userAgent.indexOf('touch') !== -1);
}

btnDiv.onclick = () => {
   if (isMobileDevice()) {
      window.open(`tel:+${phoneNumber}`, "_self");
   } else {
      // window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent("I would like to call you")}`, "_blank");
      window.open(`https://wa.me/${phoneNumber}/?text=${encodeURIComponent("I would like to call you")}`, "_blank");
   }
};

breakElement.addEventListener('mouseenter', () => {
   showElements(breakLights);
   hideElements(breakOffIndicators);
});

breakElement.addEventListener('mouseleave', () => {
   hideElements(breakLights);
   showElements(breakOffIndicators);
});

navLogoDiv.addEventListener('mouseenter', () => {
   parkingInterval = setInterval(toggleIndicatorLights, LIGHT_TOGGLE_INTERVAL);
});

navLogoDiv.addEventListener('mouseleave', () => {
   clearInterval(parkingInterval);
   hideElements(indicatorLights);
});

indicatorElements.forEach((element, index) => {
   element.addEventListener('mouseenter', () => {
      intervalIndicator = setInterval(() => {
         toggleIndicatorLight(index);
      }, LIGHT_TOGGLE_INTERVAL);
   });

   element.addEventListener('mouseleave', () => {
      clearInterval(intervalIndicator);
      hideElements(indicatorLights);
   });
});

function showElements(elements) {
   elements.forEach(element => element.style.display = 'block');
}

function hideElements(elements) {
   elements.forEach(element => element.style.display = 'none');
}

function toggleIndicatorLights() {
   indicatorLights.forEach(light => {
      light.style.display = (light.style.display === 'none') ? 'block' : 'none';
   });
}

function toggleIndicatorLight(index) {
   if (index === 0) {
      indicatorLights[0].style.display = (indicatorLights[0].style.display === 'none') ? 'block' : 'none';
   } else {
      indicatorLights[1].style.display = (indicatorLights[1].style.display === 'none') ? 'block' : 'none';
   }
}