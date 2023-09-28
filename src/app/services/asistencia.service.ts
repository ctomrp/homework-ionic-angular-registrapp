import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Asistencia } from '../interfaces/asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private firebase: AngularFirestore) {}

  guardarAsistencia(asistencia:Asistencia): Promise<any>{
    return this.firebase.collection('asistencia').add(asistencia);
  }
}
