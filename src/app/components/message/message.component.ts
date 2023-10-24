import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() header: string = 'header';
  @Input() message: string = 'message';
  public alertButtons = ['OK'];
  constructor() {}

  isAlertOpen = false;

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
