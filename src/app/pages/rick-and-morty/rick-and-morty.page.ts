import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-rick-and-morty',
  templateUrl: './rick-and-morty.page.html',
  styleUrls: ['./rick-and-morty.page.scss'],
})
export class RickAndMortyPage implements OnInit {
  characters: any;

  constructor(
    private ramService: RickAndMortyService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getList();
  }

  async getList() {
    const loading = await this.loadingCtrl.create({
      message: 'Conectando...',
    });

    try {
      await loading.present();

      this.ramService.getCharacters().subscribe((data: any) => {
        this.characters = data.results;
      });
    } finally {
      await loading.dismiss();
    }
  }

  doBack() {
    this.navCtrl.pop();
  }
}
