import { gsap } from 'gsap/all';

export default class CardUI {
  constructor() {
    this.cardElement = document.querySelector('.js-card');
    this.isOpened = false;

    this.bind();
  }

  async open() {
    console.log('open:start');
    await gsap.fromTo(this.cardElement,
      {
        rotateY: 0
      },
      {
      rotateY: 90,
      duration: .2,
      repeat: 1,
      yoyo: true,
      onRepeat: () => {
        if(!(this.isOpened)) {
          this.isOpened = true;
          this.cardElement.classList.add('card-front');
          this.cardElement.innerText = 'open';
        }
      }
      // todo: updateでprogressを取得する方法の模索
      // onUpdateParams: [this],
      // onUpdate(cardUI) {
      //   console.log(this.progress(), cardUI);
      //   if(this.progress() === 1 && !(cardUI.isOpened)) {
      //     cardUI.isOpened = true;
      //     cardUI.cardElement.classList.add('card-front');
      //     cardUI.cardElement.innerText = 'open';
      //   }
      // }
    })
    console.log('open:end');
  }

  async close() {
    console.log('close:start');
    await gsap.fromTo(this.cardElement,
      {
        rotateY: 0
      },{
      rotateY: 90,
      duration: .2,
      repeat: 1,
      yoyo: true,
      onRepeat: () => {
        if(this.isOpened) {
          this.isOpened = false;
          this.cardElement.classList.remove('card-front');
          this.cardElement.innerText = '';
        }
      }
    })
    console.log('close:end');
  }

  handleClickCard() {
    if(this.isOpened) {
      this.close()
    } else {
      this.open();
    }
  }

  bind() {
    this.cardElement.addEventListener('click', this.handleClickCard.bind(this), { passive: true });
  }
}
