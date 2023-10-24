import { Animation, AnimationController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-image',
  templateUrl: './title-image.component.html',
  styleUrls: ['./title-image.component.scss'],
})
export class TitleImageComponent implements OnInit {
  constructor(private animationCtrl: AnimationController) {}

  ngOnInit() {
    this.animateImage();
  }

  async animateImage() {
    const animation: Animation = this.animationCtrl
      .create()
      .addElement(document.querySelectorAll('.logo'))
      .duration(950)
      .iterations(Infinity)
      .direction('alternate')
      .fromTo('scale', '1.105', '1');
    await animation.play();
  }
}
