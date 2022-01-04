import CardUI from './modules/CardUI';
import LoopedAnimation from './modules/LoopedAnimation';
import ShownAnimation from './modules/shownAnimation';
// import IntersectionVelocity from './modules/IntersectionVelocity';
class App {
  constructor() {
    new CardUI();
    new LoopedAnimation();
    // new IntersectionVelocity();
    new ShownAnimation();
  }
}
new App();
