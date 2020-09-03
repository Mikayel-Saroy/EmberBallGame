import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {htmlSafe} from '@ember/template';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

const NAVBAR_HEIGHT = 90;

export default class BallComponent extends Component {
  @service Coordinates;
  @tracked left = 695;
  @tracked top = 385;

  interval = null;
  step = 2;
  speed = 2;
  elementSize = 0;

  get color() {
    return this.args.color || 'gold';
  }

  get getBallStyle() {
    if (this.color === this.Coordinates.player1Color) {
      return htmlSafe(`transform: translate(${this.left}px, ${this.top}px); background-color: ${this.color}`);
    } else {
      return htmlSafe(`transform: translate(${this.left}px, ${this.top}px); background-color: ${this.color}`);
    }
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
    this.Coordinates.mushroomX = Math.floor((Math.random() * (window.innerWidth - 140)) + 1);
    this.Coordinates.mushroomY = Math.floor((Math.random() * (window.innerHeight - 140)) + 1);
  }

  @action ballInserted(element) {
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

  reset() {
    this.Coordinates.player1Score = 0;
    this.Coordinates.player2Score = 0;
  };

  checkIfWin() {
    if (this.Coordinates.player1Score === 5) {
      alert("Player 1 Won the Game.");
      this.reset();
    } else if (this.Coordinates.player2Score === 5) {
      alert("Player 2 Won the Game.");
      this.reset();
    }
  };

  @action checkIfCrossed() {
    if ((this.Coordinates.mushroomY <= this.top + 50 && this.Coordinates.mushroomY >= this.top - 50) &&
      (this.Coordinates.mushroomX <= this.left + 50 && this.Coordinates.mushroomX >= this.left - 50)) {
      if (this.color === this.Coordinates.player1Color) {
        this.Coordinates.player1Score++;
        this.checkIfWin();
      } else {
        this.Coordinates.player2Score++;
        this.checkIfWin();
      }
      this.relocateTheBall();
    }
  }

  stopMove() {
    clearInterval(this.interval);
  }

  moveUp() {
    this.interval = setInterval(() => {
      if (this.canMove.up()) {
        return this.stopMove();
      }
      this.top -= this.step;
      this.checkIfCrossed();
    }, this.speed);
  }

  moveDown() {
    this.interval = setInterval(() => {
      if (this.canMove.down()) {
        return this.stopMove();
      }
      this.top += this.step;
      this.checkIfCrossed();
    }, this.speed);
  }

  moveLeft() {
    this.interval = setInterval(() => {
      if (this.canMove.left()) {
        return this.stopMove();
      }
      this.left -= this.step;
      this.checkIfCrossed();
    }, this.speed);
  }

  moveRight() {
    this.interval = setInterval(() => {
      if (this.canMove.right()) {
        return this.stopMove();
      }
      this.left += this.step;
      this.checkIfCrossed();
    }, this.speed);
  }

  get canMove() {
    return {
      right: () => this.left >= window.innerWidth - this.elementSize,
      left: () => this.left <= 0,
      down: () => this.top >= window.innerHeight - this.elementSize - NAVBAR_HEIGHT,
      up: () => this.top <= 0,
    }
  }
}
