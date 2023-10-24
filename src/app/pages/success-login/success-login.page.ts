import { ActivatedRoute, Router } from '@angular/router';
import { Asistencia } from '../../interfaces/asistencia';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MessageComponent } from '../../components/message/message.component';

@Component({
  selector: 'app-success-login',
  templateUrl: './success-login.page.html',
  styleUrls: ['./success-login.page.scss'],
})
export class SuccessLoginPage implements OnInit {
  @ViewChild(MessageComponent) messageComponent!: MessageComponent;

  alumno: string | null = null;
  scanActive = false;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private _asistenciaService: AsistenciaService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.activateRoute.paramMap.subscribe((params) => {
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
      document.querySelector('body').classList.add('scanner-active');

      const result = await BarcodeScanner.startScan();
      this.scanActive = false;

      document.querySelector('body').classList.remove('scanner-active');

      const asistenciaObj: Asistencia = {
        date: new Date(),
        alumno: this.alumno,
        asignatura: result.content.slice(0, -4),
        seccion: result.content.slice(-4),
      };

      this._asistenciaService
        .guardarAsistencia(asistenciaObj)
        .then(() => {
          console.log(asistenciaObj);
          this.showSuccessMessage();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      this.stopScan();
    }
  }

  showSuccessMessage() {
    this.messageComponent.header = 'Registro de Asistencia';
    this.messageComponent.message =
      '¡La asistencia ha sido registrada exitosamente!';
    this.messageComponent.setOpen(true);
  }

  doEnterApi() {
    this.router.navigate(['/rick-and-morty']);
  }

  doCancel() {
    this.loginService.signOut();
    this.router.navigate(['/welcome']);
  }

  async CheckPermission() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  stopScan() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }
  ngOnDestroy(): void {
    this.stopScan();
  }
}
