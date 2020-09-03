import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {htmlSafe} from '@ember/template';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

export default class BallComponent extends Component {
  @service Coordinates;
  @tracked left = this.Coordinates.player1X;
  @tracked top = this.Coordinates.player1Y;

  interval = null;
  step = 1;
  speed = 2;
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

  @action relocateTheBall() {
    this.Coordinates.mushroomX = Math.floor((Math.random() * (window.innerWidth - 50)) + 1);
    this.Coordinates.mushroomY = Math.floor((Math.random() * (window.innerHeight - 50)) + 1);
  }

  @action ballInserted(element) {
    this.elementSize = element.offsetWidth;
    // const mushroom = document.getElementById('mushroom');

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

  @action checkIfCrossed() {
    if ((this.Coordinates.mushroomY <= this.top + 50 && this.Coordinates.mushroomY >= this.top - 50) &&
      (this.Coordinates.mushroomX <= this.left + 50 && this.Coordinates.mushroomX >= this.left - 50)) {
      this.Coordinates.player1Score++;
      this.relocateTheBall();
    }
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
      this.checkIfCrossed();
    }, this.speed);
  }

  moveDown() {
    this.interval = setInterval(() => {
      if (this.canMoveDown()) {
        return this.stopMove();
      }
      this.top += this.step;
      this.checkIfCrossed();
    }, this.speed);
  }

  moveLeft() {
    this.interval = setInterval(() => {
      if (this.canMoveLeft()) {
        return this.stopMove();
      }
      this.left -= this.step;
      this.checkIfCrossed();
    }, this.speed);
  }

  moveRight() {
    this.interval = setInterval(() => {
      if (this.canMoveRight()) {
        return this.stopMove();
      }
      this.left += this.step;
      this.checkIfCrossed();
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
