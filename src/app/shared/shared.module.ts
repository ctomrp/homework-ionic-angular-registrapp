import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ButtonComponent } from '../components/button/button.component';
import { FooterComponent } from '../components/footer/footer.component';
import { MessageComponent } from '../components/message/message.component';
import { TitleComponent } from '../components/title/title.component';



@NgModule({
  declarations: [
    ButtonComponent,
    FooterComponent,
    MessageComponent,
    TitleComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports:[
    ButtonComponent,
    FooterComponent,
    MessageComponent,
    TitleComponent,
  ]
})
export class SharedModule { }
