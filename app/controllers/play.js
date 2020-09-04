import Controller from '@ember/controller';
import {tracked} from "@glimmer/tracking";
import {action} from '@ember/object';
import {inject as service} from "@ember/service"

const CORRECT_COLOR = "steelblue";
const ERROR_COLOR = "darkred";
const ERROR_MESSAGE = "ENTER VALID DATA";
const TR_DEFAULT_COLOR = "whitesmoke";
const SELECTED_COLOR_BACKGROUND = "steelblue";
const TR_DEFAULT_COLOR_SET_OF_12 = [
  TR_DEFAULT_COLOR, TR_DEFAULT_COLOR, TR_DEFAULT_COLOR,
  TR_DEFAULT_COLOR, TR_DEFAULT_COLOR, TR_DEFAULT_COLOR,
  TR_DEFAULT_COLOR, TR_DEFAULT_COLOR, TR_DEFAULT_COLOR,
  TR_DEFAULT_COLOR, TR_DEFAULT_COLOR, TR_DEFAULT_COLOR,
];
const COLOR_SET_COLOR_NAMES = [
  "red", "orangered", "darkorange", "orange",
  "yellow", "yellowgreen", "green", "lightseagreen",
  "blue", "blueviolet", "palevioletred", "violet",
];
const ERROR_MESSAGE_COLOR = "CHOOSE COLOR";
const MATH_FLOOR_LIMIT = 140;

export default class PlayController extends Controller {
  @service Global;
  @tracked nameA = "";
  @tracked nameB = "";
  @tracked box1Color = CORRECT_COLOR;
  @tracked box2Color = CORRECT_COLOR;
  @tracked box1ErrorMessage = "";
  @tracked box2ErrorMessage = "";

  @action updateFirstName() {
    if (this.nameA.trim() && this.nameB.trim()) {
      this.Global.player1Name = this.nameA;
      this.Global.player2Name = this.nameB;
      this.box1Color = CORRECT_COLOR;
      this.box2Color = CORRECT_COLOR;
      this.box1ErrorMessage = "";
      this.box2ErrorMessage = "";
      this.Global.playerNamesValidationError = false;
    } else if (!this.nameA.trim() && this.nameB.trim()) {
      this.box1Color = ERROR_COLOR;
      this.box2Color = CORRECT_COLOR;
      this.box1ErrorMessage = ERROR_MESSAGE;
      this.box2ErrorMessage = "";
    } else if (this.nameA.trim() && !this.nameB.trim()) {
      this.box1Color = CORRECT_COLOR;
      this.box2Color = ERROR_COLOR;
      this.box1ErrorMessage = "";
      this.box2ErrorMessage = ERROR_MESSAGE;
    } else {
      this.box1Color = ERROR_COLOR;
      this.box2Color = ERROR_COLOR;
      this.box1ErrorMessage = ERROR_MESSAGE;
      this.box2ErrorMessage = ERROR_MESSAGE;
    }
  }

  @tracked trColor = {
    @tracked A: TR_DEFAULT_COLOR_SET_OF_12,
    @tracked B: TR_DEFAULT_COLOR_SET_OF_12,
  }
  @tracked firstColorSetBorderColor = CORRECT_COLOR;
  @tracked secondColorSetBorderColor = CORRECT_COLOR;

  @action chooseColor(x, y) {
    let newArr = [...TR_DEFAULT_COLOR_SET_OF_12];
    newArr[y] = SELECTED_COLOR_BACKGROUND;
    this.trColor[x] = [...newArr];
    if (x === "A") {
      this.Global.player1Color = COLOR_SET_COLOR_NAMES[y];
    } else if (x === "B") {
      this.Global.player2Color = COLOR_SET_COLOR_NAMES[y];
    }
  }

  @action playerColorValidationErrorFUNC() {
    if (this.Global.player1Color && this.Global.player2Color) {
      this.Global.playerColorValidationError = false;
      this.box1ErrorMessage = "";
      this.box2ErrorMessage = "";
      this.firstColorSetBorderColor = CORRECT_COLOR;
      this.secondColorSetBorderColor = CORRECT_COLOR;
    } else if (!this.Global.player1Color && this.Global.player2Color) {
      this.box1ErrorMessage = ERROR_MESSAGE_COLOR;
      this.box2ErrorMessage = "";
      this.firstColorSetBorderColor = ERROR_COLOR;
      this.secondColorSetBorderColor = CORRECT_COLOR;
    } else if (this.Global.player1Color && !this.Global.player2Color) {
      this.box1ErrorMessage = "";
      this.box2ErrorMessage = ERROR_MESSAGE_COLOR;
      this.firstColorSetBorderColor = CORRECT_COLOR;
      this.secondColorSetBorderColor = ERROR_COLOR;
    } else {
      this.box1ErrorMessage = ERROR_MESSAGE_COLOR;
      this.box2ErrorMessage = ERROR_MESSAGE_COLOR;
      this.firstColorSetBorderColor = ERROR_COLOR;
      this.secondColorSetBorderColor = ERROR_COLOR;
    }
  }

  player2controls = {
    UP: 'KeyW',
    DOWN: 'KeyS',
    LEFT: 'KeyA',
    RIGHT: 'KeyD',
  }

  @action reStartTheGame() {
    this.Global.mushroomX = Math.floor((Math.random() * (window.innerWidth - MATH_FLOOR_LIMIT)) + 1);
    this.Global.mushroomY = Math.floor((Math.random() * (window.innerHeight - MATH_FLOOR_LIMIT)) + 1);
    this.Global.lightningX = Math.floor((Math.random() * (window.innerWidth - MATH_FLOOR_LIMIT)) + 1);
    this.Global.lightningY = Math.floor((Math.random() * (window.innerHeight - MATH_FLOOR_LIMIT)) + 1);
    this.Global.player1Score = 0;
    this.Global.player2Score = 0;
    this.Global.win = false;
    this.Global.winner = "";
  }
}
