import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success-login',
  templateUrl: './success-login.page.html',
  styleUrls: ['./success-login.page.scss'],
})
export class SuccessLoginPage implements OnInit {

  alumno: string | null = null;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      this.alumno = params.get('nombre'); // aca va el parametro de la ruta.
    });
  }

  doEnter(){
    console.log('Abriendo la cámara');
  }

  doCancel(){
    this.router.navigate(['/welcome']);
  }

}
