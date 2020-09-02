import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import {tracked} from "@glimmer/tracking";
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MushroomComponent extends Component {
  @tracked height;
  @tracked width;
  @service ballCoordinates;

  getMushroomStyle() {
      this.height = Math.floor((Math.random() * (window.innerHeight-50)) + 1);
      this.width = Math.floor((Math.random() * (window.innerWidth-50)) + 1);
      return htmlSafe(`transform: translate(${this.width}px, ${this.height}px);`);
  }
  @tracked styles = this.getMushroomStyle();

  @action
  setCoordinates() {
    setInterval(() => {
      this.styles = this.getMushroomStyle();
      this.ballCoordinates.mushroomXCoord = this.width;
      this.ballCoordinates.mushroomYCoord = this.height;
    }, 5000);
  }
}



