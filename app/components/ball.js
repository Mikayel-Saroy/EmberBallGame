import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';

export default class BallComponent extends Component {

  @tracked top = 100;
  @tracked left = 100;


  interval = null;
  step = 1;
  speed = 3;
  elementSize = 0;


  get color() {
    return this.args.color || 'gold';
  }

  get getBallStyle() {
    return htmlSafe(`transform: translate(${this.left}px, ${this.top}px); background-color: ${this.color}`);
  }

  get controls() {
    const initialControls = {
      UP: 'ArrowUp',
      DOWN: 'ArrowDown',
      LEFT: 'ArrowLeft',
      RIGHT: 'ArrowRight'
    };

    return this.args.controls ? this.args.controls : initialControls;
  }

  @action
  ballInserted(element) {
    this.elementSize = element.offsetWidth;
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case this.controls.UP:
          this.stopMove();
          this.moveUp();
          break;
        case this.controls.DOWN:
          this.stopMove();
          this.moveDown();
          break;
        case this.controls.LEFT:
          this.stopMove();
          this.moveLeft();
          break;
        case this.controls.RIGHT:
          this.stopMove();
          this.moveRight();
          break;
        default:
          break;
      }
    });
  }

  stopMove() {
    clearInterval(this.interval);
  }


  moveUp() {
    this.interval = setInterval(() => {
      if (this.canMoveUp()) {
        return this.stopMove();
      }
      this.top -= this.step;
    }, this.speed);
  }

  moveDown() {
    this.interval = setInterval(() => {
      if (this.canMoveDown()) {
        return this.stopMove();
      }
      this.top += this.step;
    }, this.speed);
  }

  moveLeft() {
    this.interval = setInterval(() => {
      if (this.canMoveLeft()) {
        return this.stopMove();
      }
      this.left -= this.step;
    }, this.speed);
  }

  moveRight() {
    this.interval = setInterval(() => {
      if (this.canMoveRight()) {
        return this.stopMove();
      }
      this.left += this.step;
    }, this.speed);
  }

  canMoveRight() {
    return this.left >= window.innerWidth - this.elementSize;
  }

  canMoveLeft() {
    return this.left <= 0
  }

  canMoveDown() {
    return this.top >= window.innerHeight - this.elementSize;
  }

  canMoveUp() {
    return this.top <= 0;
  }

}
