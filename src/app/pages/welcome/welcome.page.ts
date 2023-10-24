import { Animation, AnimationController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  constructor(
    private animationCtrl: AnimationController,
    private router: Router
  ) {}

  ngOnInit() {
    this.animateImage();
  }

  async animateImage() {
    const animation: Animation = this.animationCtrl
      .create()
      .addElement(document.querySelectorAll('.registrapp-img'))
      .duration(950)
      .iterations(Infinity)
      .direction('alternate')
      .fromTo('scale', '1.105', '1');
    await animation.play();
  }

  doEnter() {
    this.router.navigate(['/login']);
  }
}
