import { ButtonComponent } from '../components/button/button.component';
import { FooterComponent } from '../components/footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { MessageComponent } from '../components/message/message.component';
import { NgModule } from '@angular/core';
import { TitleComponent } from '../components/title/title.component';
import { TitleImageComponent } from '../components/title-image/title-image.component';

@NgModule({
  declarations: [
    ButtonComponent,
    FooterComponent,
    MessageComponent,
    TitleComponent,
    TitleImageComponent,
  ],
  imports: [IonicModule],
  exports: [
    ButtonComponent,
    FooterComponent,
    MessageComponent,
    TitleComponent,
    TitleImageComponent,
  ],
})
export class SharedModule {}
