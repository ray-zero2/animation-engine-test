import CardUI from './modules/CardUI';
import LoopedAnimation from './modules/LoopedAnimation';
import IntersectionVelocity from './modules/IntersectionVelocity';
class App {
  constructor() {
    new CardUI();
    new LoopedAnimation();
    new IntersectionVelocity();
  }
}
new App();
