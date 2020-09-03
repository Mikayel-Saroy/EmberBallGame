import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
// import {action} from '@ember/object';

const MATH_FLOOR_LIMIT = 140;

export default class GlobalService extends Service {
  @tracked mushroomX = Math.floor((Math.random() * (window.innerWidth - MATH_FLOOR_LIMIT)) + 1);
  @tracked mushroomY = Math.floor((Math.random() * (window.innerHeight - MATH_FLOOR_LIMIT)) + 1);

  @tracked lightningX = Math.floor((Math.random() * (window.innerWidth - MATH_FLOOR_LIMIT)) + 1);
  @tracked lightningY = Math.floor((Math.random() * (window.innerHeight - MATH_FLOOR_LIMIT)) + 1);

  @tracked player1Score = 0;
  @tracked player1Color = "darkred";

  @tracked player2Score = 0;
  @tracked player2Color = "green";
}
