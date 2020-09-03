import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import {tracked} from "@glimmer/tracking";
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MushroomComponent extends Component {
  @service Coordinates;
  @tracked styles = this.getCoordinates();
  @tracked top = this.Coordinates.mushroomY
  @tracked width = this.Coordinates.mushroomX;
}
