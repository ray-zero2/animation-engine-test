import 'intersection-observer';

//THIS CODE REQUIRES VELOCITY.JS
export default class IntersectionVelocity {
  constructor() {
    this.elementsByBias = [];
    // this.observers = [];
    this.initialize();
    window.addEventListener('DOMContentLoaded', () => {
      this.createObservers();
    });
  }

  initialize() {
    const $elements = Array.from(document.querySelectorAll('.js-observed'));
    $elements.forEach($element => {
      $element.style.opacity = 0;
      $element.delay = $element.dataset.delay || 0;
      $element.duration = $element.dataset.duration || 800;
      $element.easing = $element.dataset.easing || [250, 20];

      //エフェクトの設定
      try {
        $element.property = JSON.parse($element.dataset.effect);
        if ($element.property.opacity === undefined) {
          $element.property.opacity = [1, 0];
        }
      } catch (e) {
        $element.property = 'fadeIn';
      }

      //ターゲットの設定
      const $target = document.querySelector($element.dataset.target);
      let $data = 0;
      if ($target) {
        $target.$action = $element;
        $data = $target;
      } else {
        $data = $element;
      }

      //バイアスの設定とバイアスごとに要素の振り分け
      const biasValue =
        $element.dataset.bias === undefined
          ? 0
          : parseInt($element.dataset.bias);
      const index = this.elementsByBias.findIndex(
        obj => obj.bias === biasValue
      );
      //新しいバイアスが設定されている場合、オブジェクトを作って配列に追加する
      if (index === -1) {
        this.elementsByBias.push({ bias: biasValue, elements: [$data] }); //{bias: バイアスの値, elements: そのバイアスが設定された要素の配列}
      } else {
        this.elementsByBias[index].elements.push($data);
      }
    });
  }

  //バイアスごとにobserverを生成
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
      // this.observers.push(observer);
    });
    // console.log(this.observers);
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
