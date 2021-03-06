import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

const NAVBAR_HEIGHT = 90;
const MATH_FLOOR_LIMIT = 140;
const INITIAL_SIZE = 50;
const WIN_SCORE = 5;
const INITIAL_SPEED = 6;
const INITIAL_STEP = 2;
const GROWTH_RATE = 20;
const DIRECTION_UP = "up";
const DIRECTION_RIGHT = "right";
const DIRECTION_DOWN = "down";
const DIRECTION_LEFT = "left";


export default class BallComponent extends Component {
  @service Global;
  @tracked left = Math.floor((Math.random() * (window.innerWidth - MATH_FLOOR_LIMIT)) + 1);
  @tracked top = Math.floor((Math.random() * (window.innerHeight - MATH_FLOOR_LIMIT)) + 1);
  @tracked ballHeight = INITIAL_SIZE;
  @tracked ballGrowth = 0;

  interval = null;
  step = INITIAL_STEP;
  speed = INITIAL_SPEED;
  elementSize = 0;

  get color() {
    return this.args.color;
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

  @action relocateTheItem(itemName) {
    if (itemName === 'mushroom') {
      this.Global.mushroomX = Math.floor((Math.random() * (window.innerWidth - MATH_FLOOR_LIMIT)) + 1);
      this.Global.mushroomY = Math.floor((Math.random() * (window.innerHeight - MATH_FLOOR_LIMIT)) + 1);
    } else if (itemName === "lightning") {
      this.Global.lightningX = Math.floor((Math.random() * (window.innerWidth - MATH_FLOOR_LIMIT)) + 1);
      this.Global.lightningY = Math.floor((Math.random() * (window.innerHeight - MATH_FLOOR_LIMIT)) + 1);
    }
  }

  @action ballInserted(element) {
    this.elementSize = element.offsetWidth;
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case this.controls.UP:
          this.stopMove();
          this.move(DIRECTION_UP);
          break;
        case this.controls.DOWN:
          this.stopMove();
          this.move(DIRECTION_DOWN);
          break;
        case this.controls.LEFT:
          this.stopMove();
          this.move(DIRECTION_LEFT);
          break;
        case this.controls.RIGHT:
          this.stopMove();
          this.move(DIRECTION_RIGHT);
          break;
        default:
          break;
      }
    });
  }

  reset() {
    this.interval = null;
    this.step = INITIAL_STEP;
    this.speed = INITIAL_SPEED;
    this.elementSize = 0;
    this.ballHeight = INITIAL_SIZE;
    this.ballGrowth = 0;
  };

  checkIfWin() {
    if (this.Global.player1Score === WIN_SCORE) {
      this.Global.win = true;
      this.Global.winner = this.Global.player1Name;
      this.reset();
    } else if (this.Global.player2Score === WIN_SCORE) {
      this.Global.win = true;
      this.Global.winner = this.Global.player2Name;
      this.reset();
    } else {
      this.speed += 2;
      this.ballGrowth += GROWTH_RATE;
      this.ballHeight += GROWTH_RATE;
    }
  };

  @action checkIfCrossed() {
    if ((this.Global.mushroomY <= this.top + INITIAL_SIZE + this.ballGrowth && this.Global.mushroomY >= this.top - INITIAL_SIZE) &&
      (this.Global.mushroomX <= this.left + INITIAL_SIZE + this.ballGrowth && this.Global.mushroomX >= this.left - INITIAL_SIZE)) {
      if (this.color === this.Global.player1Color) {
        this.Global.player1Score++;
        this.checkIfWin();
      } else {
        this.Global.player2Score++;
        this.checkIfWin();
      }
      this.relocateTheItem("mushroom");
    } else if ((this.Global.lightningY <= this.top + INITIAL_SIZE + this.ballGrowth && this.Global.lightningY >= this.top - INITIAL_SIZE) &&
      (this.Global.lightningX <= this.left + INITIAL_SIZE + this.ballGrowth && this.Global.lightningX >= this.left - INITIAL_SIZE)) {
      this.step = 4;
      this.relocateTheItem("lightning");
    }
  }

  stopMove() {
    clearInterval(this.interval);
  }

  move(direction) {
    let directionCheckFunc;
    if (direction === DIRECTION_UP) {
      directionCheckFunc = this.canMove.up;
    } else if (direction === DIRECTION_RIGHT) {
      directionCheckFunc = this.canMove.right;
    } else if (direction === DIRECTION_DOWN) {
      directionCheckFunc = this.canMove.down;
    } else if (direction === DIRECTION_LEFT) {
      directionCheckFunc = this.canMove.left;
    }
    this.interval = setInterval(() => {
      if (directionCheckFunc()) {
        return this.stopMove();
      }
      switch (direction) {
        case DIRECTION_UP:
          this.top -= this.step;
          break;
        case DIRECTION_RIGHT:
          this.left += this.step;
          break;
        case DIRECTION_DOWN:
          this.top += this.step;
          break;
        case DIRECTION_LEFT:
          this.left -= this.step;
          break;
        default:
          break;
      }
      this.checkIfCrossed();
    }, this.speed);
  }

  // moveUp() {
  //   this.interval = setInterval(() => {
  //     if (this.canMove.up()) {
  //       return this.stopMove();
  //     }
  //     this.top -= this.step;
  //     this.checkIfCrossed();
  //   }, this.speed);
  // }
  //
  // moveDown() {
  //   this.interval = setInterval(() => {
  //     if (this.canMove.down()) {
  //       return this.stopMove();
  //     }
  //     this.top += this.step;
  //     this.checkIfCrossed();
  //   }, this.speed);
  // }
  //
  // moveLeft() {
  //   this.interval = setInterval(() => {
  //     if (this.canMove.left()) {
  //       return this.stopMove();
  //     }
  //     this.left -= this.step;
  //     this.checkIfCrossed();
  //   }, this.speed);
  // }
  //
  // moveRight() {
  //   this.interval = setInterval(() => {
  //     if (this.canMove.right()) {
  //       return this.stopMove();
  //     }
  //     this.left += this.step;
  //     this.checkIfCrossed();
  //   }, this.speed);
  // }

  get canMove() {
    return {
      right: () => this.left >= window.innerWidth - this.elementSize - this.ballGrowth,
      left: () => this.left <= 0,
      down: () => this.top >= window.innerHeight - this.elementSize - NAVBAR_HEIGHT - this.ballGrowth,
      up: () => this.top <= 0,
    }
  }
}
