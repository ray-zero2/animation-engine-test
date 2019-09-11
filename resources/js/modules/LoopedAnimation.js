//THIS CODE REQUIRES VELOCITY.JS
export default class {
  constructor() {
    this.$start = document.querySelector('.js-start');
    this.$stop = document.querySelector('.js-stop');
    this.$target = document.querySelector('.js-movedTarget');
    this.hasStarted = false;
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
    this.hasStarted = true;
  }

  handleClickStop() {
    this.pause();
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
        duration: duration
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
        duration: duration
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
        duration: duration
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
        complete: () => {
          this.startAnimation();
        }
      }
    );
  }

  startAnimation() {
    this.rotation(360 * 5, 'easeInQuart', 300);
    this.changeSize(1.3, '[0.29, 1.53, 0.53, -0.52]', 500);
    this.changePosition('130px', 'linear', 500);
    this.changeSize(1, '[0.29, 1.53, 0.53, -0.52]', 500);
    this.rotation(0, 'liner', 0);
    this.resetPosition();
  }

  move() {
    this.hasStarted ? velocity(this.$target, 'resume') : this.startAnimation();
  }
  pause() {
    velocity(this.$target, 'pause');
  }
}
