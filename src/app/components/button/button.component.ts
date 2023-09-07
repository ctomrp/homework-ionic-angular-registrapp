import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent  implements OnInit {

  constructor(
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    this.animateButton();
  }

  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() label: string = '';
  @Input() style: string = 'default';
  @Output() onClick = new EventEmitter<void>();

  async animateButton(){
    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll(".label"))
      .duration(500)
      .iterations(Infinity)
      .direction('alternate')
      .fromTo('scale','1.105','1');
    await animation.play();
  }

}
