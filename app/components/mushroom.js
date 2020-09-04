import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class MushroomComponent extends Component {
  @service Global;
}
