import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import {tracked} from "@glimmer/tracking";
// import sh from './../../public/images/mushroom.png';

export default class MushroomComponent extends Component {
  @tracked height;
  @tracked width;

  get getMushroomStyle() {
      this.height = Math.floor((Math.random() * (window.innerHeight-50)) + 1);
      this.width = Math.floor((Math.random() * (window.innerWidth-50)) + 1);
      // this.generateNewLocation();
      return htmlSafe(`transform: translate(${this.width}px, ${this.height}px);`);
  }

  generateNewLocation() {
    setInterval(() => {
      this.getMushroomStyle();
    }, 5000);
  }
}



