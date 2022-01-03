import { gsap, CustomEase } from 'gsap/all';
gsap.registerPlugin(CustomEase);

export default class LoopedAnimation {
  constructor() {
    this.$start = document.querySelector('.js-start');
    this.$stop = document.querySelector('.js-stop');
    this.$slow = document.querySelector('.js-slow');
    this.$fast = document.querySelector('.js-fast');
    this.$timescale = document.querySelector('.js-timescale');
    this.$target = document.querySelector('.js-movedTarget');
    this.tl = gsap.timeline({repeat: -1, repeatDelay: 0.3, paused: true});
    this.init();
    this.bind();
  }

  move() {
    this.tl.play();
  }
  pause() {
    this.tl.pause()
  }

  handleClickStart() {
    this.move();
  }

  handleClickStop() {
    this.pause();
  }

  handleClickSlow() {
    const currentTimeScale = this.tl.timeScale();
    const timeScale = currentTimeScale - 0.25;
    this.tl.timeScale(timeScale);
    this.$timescale.innerText = timeScale;
  }

  handleClickFast() {
    const currentTimeScale = this.tl.timeScale();
    const timeScale = currentTimeScale + 0.25;
    this.tl.timeScale(timeScale);
    this.$timescale.innerText = timeScale;
  }

  bind() {
    this.$start.addEventListener('click', this.handleClickStart.bind(this), {passive: true});
    this.$stop.addEventListener('click', this.handleClickStop.bind(this), {passive: true});
    this.$slow.addEventListener('click', this.handleClickSlow.bind(this), {passive: true});
    this.$fast.addEventListener('click', this.handleClickFast.bind(this), {passive: true});
  }

  createAnimation() {
    const target = this.$target;
    this.tl.to(target,
      {
        rotateZ: 360*5,
        duration: 1,
        ease: 'power3.inout'
      }
    )
    .to(
      target,
      {
        scale: 1.3,
        duration: 0.8,
        // ベジェはcustomEaseで生成
        ease: CustomEase.create('testEase', '.55,.05,.22,.99'),
      }
    )
    .to(
      target,
      {
        x: 300,
        ease: 'testEase',
        duration: 0.8
      }
    )
    .to(
      target,
      {
        scale: 1,
        y: 200,
        duration: 0.8,
        ease: 'testEase'
      }
    )
    .to(
      target,
      {
        rotateZ: '+=90',
        duration: 0.4,
        ease: 'testEase'
      },
      '<0.2' // <: 上のアニメーションの開始と同時、その後の数字はそこからの経過時間
    )
    .to(
      target,
      {
        rotateZ: 0,
        x: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'testEase'
      },
    )
    .to(
      target,
      {
        y: 0,
        ease: 'elastic.out(1, 0.3)',
        duration: 0.8,
        delay: 0.3,
      }
    )
  }

  init() {
    this.createAnimation();
  }
}
