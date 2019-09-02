import CardUI from './modules/CardUI';
import LoopedAnimation from './modules/LoopedAnimation';
class App {
  constructor() {
    new CardUI();
    new LoopedAnimation();
  }
}
new App();
