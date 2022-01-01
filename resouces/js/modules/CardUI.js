import velocity from 'velocity-animate';
export default class CardUI {
  constructor() {
    this.$card = document.querySelector('.js-card');
    this.isOpened = false;
    this.bind();
  }

  bind() {
    this.$card.addEventListener('click', () => {
      this.handleClickCard();
    });
  }

  handleClickCard() {
    this.isOpened ? this.close() : this.open();
  }

  open() {
    velocity(
      this.$card,
      { rotateY: 90 },
      {
        duration: 200,
        loop: 1,
        progress: (elements, complete) => {
          if (!this.isOpened && complete === 1) {
            this.isOpened = true;
            this.$card.classList.add('card-front');
            this.$card.innerText = 'open';
          }
        }
      }
    );
  }

  close() {
    velocity(
      this.$card,
      { rotateY: 90 },
      {
        duration: 200,
        loop: 1,
        progress: (elements, complete) => {
          if (this.isOpened && complete === 1) {
            this.isOpened = false;
            this.$card.classList.remove('card-front');
            this.$card.innerText = '';
          }
        }
      }
    );
  }
}