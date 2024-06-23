"use client";
import { useEffect, FC } from "react"
import Light from "./light"

export const Home: FC = () => {
   const phoneNumber = '918970517155';

   function isMobileDevice(): boolean {
      const userAgent = navigator.userAgent;
      return (
         typeof window.orientation !== 'undefined' ||
         userAgent.indexOf('Mobile') !== -1 ||
         userAgent.indexOf('touch') !== -1
      );
   }

   function getUrlParameter(name: string): string {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
      const results = regex.exec(window.location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
   }

   // if (getUrlParameter('tourClicked') === 'true') {
   //    breakElement.classList.add('spongeAnimation');
   // }

   const handleBtnClick = () => {
      if (isMobileDevice()) {
         window.open(`tel:+${phoneNumber}`, '_self');
      } else {
         window.open(`https://wa.me/${phoneNumber}/?text=${encodeURIComponent('I would like to call you')}`, '_blank');
      }
   };

   useEffect(() => {
      const LIGHT_TOGGLE_INTERVAL: number = 500;
      // const BLINKING_DURATION: number = 4000;
      // let isAnimating: boolean = true;
      let parkingInterval: NodeJS.Timeout | undefined;
      // let animationInterval: NodeJS.Timeout | undefined;
      let intervalIndicator: NodeJS.Timeout | undefined;

      const breakElement = document.getElementById('break') as HTMLElement;
      const breakLights = document.querySelectorAll('#break-light');
      const breakOffIndicators = document.querySelectorAll('#break-remove');
      const indicatorElements = document.querySelectorAll('.indicator');
      const indicatorLights = document.querySelectorAll('#indicator-light');
      // const indicatorOffIndicators = document.querySelectorAll('#indicator-remove');
      const navLogoDiv = document.querySelector('.nav-logo-div') as HTMLElement;
      // const btnDiv = document.querySelector('.btn-div') as HTMLElement;

      // const gallery = document.querySelector('.gallery') as HTMLElement;
      // const hammertime = new Hammer(document.body);

      // function handleSwipe(event: HammerInput) {
      //    if (isAnimating) {
      //       isAnimating = false;
      //       event.preventDefault();
      //       gallery.classList.add('animate-light');

      //       gallery.style.borderTop = '3.6px solid darkred';
      //       setTimeout(() => {
      //          gallery.style.borderTop = 'none';
      //       }, 2000);

      //       const startTime = Date.now();
      //       animationInterval = setInterval(() => {
      //          const elapsedTime = Date.now() - startTime;

      //          if (elapsedTime >= BLINKING_DURATION) {
      //             (indicatorLights[1] as HTMLElement).style.display = 'none';
      //             clearInterval(animationInterval);
      //             return;
      //          }

      //          toggleIndicatorLight(1);
      //       }, LIGHT_TOGGLE_INTERVAL);
      //    }
      // }

      // hammertime.on('swiperight', handleSwipe);
      // hammertime.on('swipeleft', handleSwipe);

      // hammertime.on('swipeend', () => {
      //    gallery.classList.remove('animate-light');
      //    clearInterval(animationInterval);
      // });

      // TODO:
      // function getUrlParameter(name: string): string {
      //    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      //    const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
      //    const results = regex.exec(window.location.search);
      //    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
      // }

      // if (getUrlParameter('tourClicked') === 'true') {
      //    breakElement.classList.add('spongeAnimation');
      // }

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

      function showElements(elements: NodeListOf<Element>) {
         elements.forEach((element) => {
            (element as HTMLElement).style.display = 'block';
         });
      }

      function hideElements(elements: NodeListOf<Element>) {
         elements.forEach((element) => {
            (element as HTMLElement).style.display = 'none';
         });
      }

      function toggleIndicatorLights() {
         indicatorLights.forEach((light) => {
            (light as HTMLElement).style.display = (light as HTMLElement).style.display === 'none' ? 'block' : 'none';
         });
      }

      function toggleIndicatorLight(index: number) {
         if (index === 0) {
            (indicatorLights[0] as HTMLElement).style.display = (indicatorLights[0] as HTMLElement).style.display === 'none' ? 'block' : 'none';
         } else {
            (indicatorLights[1] as HTMLElement).style.display = (indicatorLights[1] as HTMLElement).style.display === 'none' ? 'block' : 'none';
         }
      }

      return () => {
         // Clean up event listeners when the component unmounts
         // hammertime.off('swiperight', handleSwipe);
         // hammertime.off('swipeleft', handleSwipe);
         breakElement.removeEventListener('mouseenter', () => {
            showElements(breakLights);
            hideElements(breakOffIndicators);
         });

         breakElement.removeEventListener('mouseleave', () => {
            hideElements(breakLights);
            showElements(breakOffIndicators);
         });

         navLogoDiv.removeEventListener('mouseenter', () => {
            parkingInterval = setInterval(toggleIndicatorLights, LIGHT_TOGGLE_INTERVAL);
         });

         navLogoDiv.removeEventListener('mouseleave', () => {
            clearInterval(parkingInterval);
            hideElements(indicatorLights);
         });

         indicatorElements.forEach((element, index) => {
            element.removeEventListener('mouseenter', () => {
               intervalIndicator = setInterval(() => {
                  toggleIndicatorLight(index);
               }, LIGHT_TOGGLE_INTERVAL);
            });

            element.removeEventListener('mouseleave', () => {
               clearInterval(intervalIndicator);
               hideElements(indicatorLights);
            });
         });
      };
   }, []);

   return (
      <>
         <Light position="left" />
         <div className="content-content">
            <h1>Explore Honnavar Like a Local</h1>
            <p>
               Embark on a unique journey through the heart of Honnavar with our
               authentic rickshaw tours.
            </p>
            <div className="flex-center">
               <div className={`btn-div ${getUrlParameter('tourClicked') === 'true' && 'spongeAnimation'}`} id="break">
                  <button onClick={handleBtnClick} id="btn">Book Your Tour Today!</button>
               </div>
            </div>
         </div>
         <Light position="right" />
      </>
   )
}

export default Home;