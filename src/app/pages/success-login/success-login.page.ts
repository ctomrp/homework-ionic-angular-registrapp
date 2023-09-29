import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageComponent } from '../../components/message/message.component';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { Asistencia } from '../../interfaces/asistencia';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-success-login',
  templateUrl: './success-login.page.html',
  styleUrls: ['./success-login.page.scss'],
})
export class SuccessLoginPage implements OnInit {

  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  
  alumno: string | null = null;
  content_visibility = '';
  scanActive = false;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private _asistenciaService: AsistenciaService,
  ) { }


  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      this.alumno = params.get('nombre');
    });
  }

  async doEnter() {
    try {
      const permission = await this.CheckPermission();
      if (!permission) {
        return;
      }
      this.scanActive = true;
      // await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      // this.content_visibility = 'hidden';
  
      const result = await BarcodeScanner.startScan();
      this.scanActive= false;
      // BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      // this.content_visibility = '';
  
      const asistenciaObj: Asistencia = {
        date: new Date(),
        alumno: this.alumno,
        asignatura: result.content
      };
  
      this._asistenciaService.guardarAsistencia(asistenciaObj)
        .then(() => {
          console.log(asistenciaObj);
          this.showSuccessMessage();
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      this.stopScan();
    }
  }
  
  showSuccessMessage() {
    this.messageComponent.header = 'Registro de Asistencia';
    this.messageComponent.message = '¡La asistencia ha sido registrada exitosamente!';
    this.messageComponent.setOpen(true);
  }

  doCancel(){
    this.router.navigate(['/welcome']);
  }

// metodo para verificar permiso del scanner
async CheckPermission(){
  try {
    const status = await BarcodeScanner.checkPermission({force : true});
    if(status.granted){
      return true;
    }
    return false;
  } catch (error) {
    console.log(error)
    return false;
  }
}
stopScan(){
  // BarcodeScanner.showBackground();
  BarcodeScanner.stopScan();
  this.scanActive= false;
  // document.querySelector('body').classList.remove('scanner-active');
  // this.content_visibility = '';
} 
ngOnDestroy(): void {
  this.stopScan();
} 
}
