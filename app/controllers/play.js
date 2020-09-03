import Controller from '@ember/controller';
import {tracked} from "@glimmer/tracking";
import { inject as service } from "@ember/service"

export default class PlayController extends Controller {
  @service Global;

  player2controls = {
    UP: 'KeyW',
    DOWN: 'KeyS',
    LEFT: 'KeyA',
    RIGHT: 'KeyD',
  }
}
