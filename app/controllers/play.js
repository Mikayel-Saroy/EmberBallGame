import Controller from '@ember/controller';
import {tracked} from "@glimmer/tracking";
import { inject as service } from "@ember/service"

export default class PlayController extends Controller {
  get player1score() {
    return 0
  };
  @tracked player2score = 0;
  @tracked mushroomX = 0;

  @service ballCoordinates;
  player2controls = {
    UP: 'KeyW',
    DOWN: 'KeyS',
    LEFT: 'KeyA',
    RIGHT: 'KeyD'
  }
}
