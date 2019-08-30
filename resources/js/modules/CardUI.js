export default class {
  constructor() {
    this.$card = document.querySelector('.card');
    this.bind();
    this.isOpened = false;
    this.text = 'open';
  }

  bind() {
    this.$card.addEventListener('click', () => {
      this.handleClickedCard();
    });
  }
  handleClickedCard() {
    velocity(this.$card, 'finish');
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
            this.$card.innerText = this.text;
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
