//THIS CODE REQUIRES VELOCITY.JS
export default class {
  constructor() {
    this.$start = document.querySelector('.js-start');
    this.$stop = document.querySelector('.js-stop');
    this.$target = document.querySelector('.js-movedTarget');
    this.frameID = 0;
    this.isAnimated = false;
    this.hasQueue = false;
    this.bind();
  }

  bind() {
    this.$start.addEventListener('click', () => {
      this.handleClickStart();
    });
    this.$stop.addEventListener('click', () => {
      this.handleClickStop();
    });
  }

  handleClickStart() {
    this.move();
    this.isAnimated = true;
  }
  handleClickStop() {
    velocity(this.$target, 'stop', 'move');
    this.isAnimated = false;
  }
  changeSize(prop, easing, duration) {
    velocity(
      this.$target,
      {
        scaleX: prop,
        scaleY: prop
      },
      {
        easing: easing,
        duration: duration,
        queue: 'move'
      }
    );
  }
  changePosition(prop, easing, duration) {
    velocity(
      this.$target,
      {
        translateX: prop
      },
      {
        easing: easing,
        duration: duration,
        queue: 'move'
      }
    );
  }
  rotation(prop, easing, duration) {
    velocity(
      this.$target,
      {
        rotateZ: prop
      },
      {
        easing: easing,
        duration: duration,
        queue: 'move'
      }
    );
  }
  resetPosition() {
    velocity(
      this.$target,
      { translateX: '0px' },
      {
        easing: 'linear',
        duration: 500,
        queue: 'move',
        complete: () => {
          this.setQueue();
        }
      }
    );
  }

  setQueue() {
    this.rotation(360 * 5, 'easeInQuart', 300);
    this.changeSize(1.3, '[0.29, 1.53, 0.53, -0.52]', 500);
    this.changePosition('130px', 'linear', 500);
    this.changeSize(1, '[0.29, 1.53, 0.53, -0.52]', 500);
    this.rotation(0, 'liner', 0);
    this.resetPosition();
  }

  move() {
    if (this.isAnimated) return;
    if (this.hasQueue === false) {
      this.setQueue();
      this.hasQueue === true;
    }
    velocity.Utilities.dequeue(this.$target, 'move');
  }
}
