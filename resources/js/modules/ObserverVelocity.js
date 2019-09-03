require('intersection-observer');
export default class ObserverVelocity {
  constructor() {
    this.$elements = document.querySelectorAll('.js-observed');
    this.elementLength = [...this.$elements].length;
    this.arrayElements = [];
    this.setTargetElements = [];
    this.initialize();
    window.addEventListener('load', () => {
      this.start();
    });
  }

  initialize() {
    for (let index = 0; index < this.elementLength; index++) {
      // this.$elements[index].style.opacity = 0;
      const $ELEMENT = this.$elements[index];
      const $TARGET = document.querySelector($ELEMENT.dataset.target);
      $ELEMENT.delay = $ELEMENT.dataset.delay || 0;
      $ELEMENT.duration = $ELEMENT.dataset.duration || 800;
      $ELEMENT.easing = $ELEMENT.dataset.easing || [250, 20];
      $ELEMENT.style.opacity = 0;

      try {
        console.log($ELEMENT.dataset.effect);
        $ELEMENT.property = JSON.parse($ELEMENT.dataset.effect);
        if ($ELEMENT.property.opacity === undefined) {
          $ELEMENT.property.opacity = [1, 0];
        }
      } catch (e) {
        $ELEMENT.property = 'fadeIn';
      }

      if ($TARGET) {
        //targetを監視対象として動かす
        $TARGET.$actElement = $ELEMENT;
        this.setTargetElements.push($TARGET);
        console.log(this.setTargetElements);
      } else {
        this.arrayElements.push($ELEMENT);
      }
    }
  }

  start() {
    const OPTIONS = {
      root: null,
      rootMargin: '-25% 0px',
      threshold: 0
    };
    this.createObserver(OPTIONS);
  }

  createObserver(options) {
    const OBSERVER = new IntersectionObserver((entires, object) => {
      this.startAnimation(entires, object);
    }, options);
    this.arrayElements.forEach(element => {
      OBSERVER.observe(element);
    });
    this.setTargetElements.forEach(element => {
      OBSERVER.observe(element);
    });
  }

  startAnimation(entires, object) {
    entires.forEach(entry => {
      if (entry.isIntersecting) {
        console.log(entry);
        const ELEMENT =
          entry.target.$actElement === undefined
            ? entry.target
            : entry.target.$actElement;
        this.animation(ELEMENT);
        object.unobserve(entry.target);
      }
    });
  }

  animation(element) {
    velocity(element, element.property, {
      display: 'block',
      delay: element.delay,
      easing: element.easing,
      duration: element.duration
    });
  }
}
