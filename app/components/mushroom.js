import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import { inject as service } from '@ember/service';

export default class MushroomComponent extends Component {
  @service Global;
  @tracked styles = this.getGlobal();
  @tracked top = this.Global.mushroomY
  @tracked width = this.Global.mushroomX;
}
