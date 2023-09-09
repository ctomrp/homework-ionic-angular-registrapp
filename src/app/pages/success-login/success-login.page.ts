import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageComponent } from '../../components/message/message.component';

@Component({
  selector: 'app-success-login',
  templateUrl: './success-login.page.html',
  styleUrls: ['./success-login.page.scss'],
})
export class SuccessLoginPage implements OnInit {

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  
  alumno: string | null = null;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }



  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      this.alumno = params.get('nombre');
    });
  }

  doEnter(){
    this.messageComponent.header = 'Estamos trabajando para ud.';
    this.messageComponent.message = 'Módulo en construcción.';
    this.messageComponent.setOpen(true);
  }

  doCancel(){
    this.router.navigate(['/welcome']);
  }

}
