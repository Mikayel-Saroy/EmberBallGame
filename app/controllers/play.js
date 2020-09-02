import Controller from '@ember/controller';
import {tracked} from "@glimmer/tracking";

export default class PlayController extends Controller {
  @tracked player1score = 0;
  @tracked player2score = 0;

  player2controls = {
    UP: 'KeyW',
    DOWN: 'KeyS',
    LEFT: 'KeyA',
    RIGHT: 'KeyD'
  }
}
