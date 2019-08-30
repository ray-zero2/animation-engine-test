export default class {
  constructor() {
    this.$card = document.querySelector('.card');
    this.bind();
    this.doesCardOpen = false;
    this.text = 'open';
  }

  bind() {
    this.$card.addEventListener('click', () => {
      this.handleClickedCard();
    });
  }
  handleClickedCard() {
    velocity(this.$card, 'finish');
    this.doesCardOpen ? this.cardClose() : this.cardOpen();
  }

  cardOpen() {
    velocity(
      this.$card,
      { rotateY: 90 },
      {
        duration: 200,
        loop: 1,
        progress: (elements, complete) => {
          if (complete === 1 && this.doesCardOpen === false) {
            this.doesCardOpen = true;
            this.$card.classList.add('card-front');
            this.$card.innerText = this.text;
          }
        }
      }
    );
  }

  cardClose() {
    velocity(
      this.$card,
      { rotateY: 90 },
      {
        duration: 200,
        loop: 1,
        progress: (elements, complete) => {
          if (complete === 1 && this.doesCardOpen === true) {
            this.doesCardOpen = false;
            this.$card.classList.remove('card-front');
            this.$card.innerText = '';
          }
        }
      }
    );
  }
}
