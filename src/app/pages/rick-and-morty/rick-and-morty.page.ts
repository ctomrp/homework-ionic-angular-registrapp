import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { LoadingController, NavController } from '@ionic/angular';

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
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() { 
    this.getList();
  }

  async getList(){
    const loading = await this.loadingCtrl.create({
      message: 'Conectando...',
    });
    await loading.present();

    this.ramService.getCharacters().subscribe((data: any) => {
      this.characters = data.results;
    })

    await loading.dismiss();

  }
  
  doBack(){
    this.navCtrl.pop()
  }
}
