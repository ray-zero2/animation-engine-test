import CardUI from './modules/CardUI';
import LoopedAnimation from './modules/LoopedAnimation';
import ObserverVelocity from './modules/ObserverVelocity';
class App {
  constructor() {
    new CardUI();
    new LoopedAnimation();
    new ObserverVelocity();
  }
}
new App();
