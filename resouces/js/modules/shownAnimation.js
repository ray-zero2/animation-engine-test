import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class ShownAnimation {
  constructor() {
    this.elements = Array.from(document.querySelectorAll('.js-observed'));
    this.init();
    this.setUp();
  }


  init() {
    gsap.set(this.elements, {
      autoAlpha: 0
    });
  }

  setUp() {
    this.elements.forEach(
    element => {
      const duration =
        Number.isNaN(parseFloat(element.dataset.duration))
        ? 0.5
        : parseFloat(element.dataset.duration);
      const delay =
        Number.isNaN(parseFloat(element.dataset.delay))
        ? 0
        : parseFloat(element.dataset.delay);
      const bias =
        Number.isNaN(parseInt(element.dataset.bias, 10))
        ? 0
        : parseInt(element.dataset.bias, 10);
      const target =
        element.dataset?.target || element;

      const effectFrom = element.dataset?.from ? JSON.parse(element.dataset.from) : {};
      const effectTo = element.dataset?.to ? JSON.parse(element.dataset.to) : {};

      gsap.fromTo(element, {
        ...effectFrom
      }, {
        ...effectTo,
        autoAlpha: 1,
        duration,
        delay,
        ease: 'testEase',
        scrollTrigger: {
          trigger: target,
          markers: true,
          once: true,
          start: `top ${75 - bias}%`,
          end: `top ${75 - bias}%`,
          // end: 'top 60%',
          // scrub: true
        },
      })
    })
  }
}
