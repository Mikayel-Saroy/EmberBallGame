import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class BallCoordinatesService extends Service {
  @tracked mushroomXCoord;
  @tracked mushroomYCoord;
  @tracked player2Score = 0;
  @tracked player1Score = 0;
}
