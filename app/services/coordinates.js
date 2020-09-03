import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import {action} from '@ember/object';


export default class CoordinatesService extends Service {
  @tracked mushroomX = 300;
  @tracked mushroomY = 300;

  @tracked player1Score = 0;
  @tracked player1X = 100;
  @tracked player1Y = 300;
  @tracked player1Color = "darkred";

  @tracked player2Score = 0;
  @tracked player2Color = "green";
}
