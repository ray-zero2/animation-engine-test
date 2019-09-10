import 'intersection-observer';
//THIS CODE REQUIRES VELOCITY.JS
export default class IntersectionVelocity {
  constructor() {
    this.$elements = Array.from(document.querySelectorAll('.js-observed'));
    this.elementsByBias = [];
    this.observers = [];
    this.initialize();
    window.addEventListener('DOMContentLoaded', () => {
      this.createObservers();
    });
  }

  initialize() {
    this.$elements.forEach($element => {
      $element.delay = $element.dataset.delay || 0;
      $element.duration = $element.dataset.duration || 800;
      $element.easing = $element.dataset.easing || [250, 20];
      $element.style.opacity = 0;

      try {
        $element.property = JSON.parse($element.dataset.effect);
        if ($element.property.opacity === undefined) {
          $element.property.opacity = [1, 0];
        }
      } catch (e) {
        $element.property = 'fadeIn';
      }

      const $target = document.querySelector($element.dataset.target);
      let $data = 0;
      if ($target) {
        $target.$action = $element;
        $data = $target;
      } else {
        $data = $element;
      }

      const biasNum =
        $element.dataset.bias === undefined ? 0 : $element.dataset.bias;
      const index = this.elementsByBias.findIndex(v => v.bias === biasNum);
      if (index === -1) {
        this.elementsByBias.push({ bias: biasNum, elements: [$data] });
      } else {
        this.elementsByBias[index].elements.push($data);
      }
    });
  }

  createObservers() {
    const defaultMargin = -25; //-25%

    this.elementsByBias.forEach(obj => {
      const margin = defaultMargin - obj.bias;
      const observer = new IntersectionObserver(
        (entries, object) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            this.animation(entry);
            object.unobserve(entry.target);
          });
        },
        {
          root: null,
          rootMargin: `100% 100% ${margin}%`,
          threshold: 0
        }
      );
      obj.elements.forEach($element => {
        observer.observe($element);
      });

      this.observers.push(observer);
    });
  }

  animation(entry) {
    const $element =
      entry.target.$action === undefined ? entry.target : entry.target.$action;
    velocity($element, $element.property, {
      display: 'block',
      delay: $element.delay,
      easing: $element.easing,
      duration: $element.duration
    });
  }
}
