import { Component, OnInit } from '@angular/core';
import { ComisionService } from '../comision.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comision } from '../comision';

@Component({
  selector: 'app-solicitud-comision',
  templateUrl: './solicitud-comision.component.html',
  styleUrls: ['./solicitud-comision.component.css']
})
export class SolicitudComisionComponent implements OnInit {

  
  comisionForm: FormGroup;
  submitted = false;
  comision: Comision = {
    _id: null,
    investigadorID: null,
    destino: null,
    fechaInicio: null,
    fechaFin: null,
    sustitutoID: null,
    razon: null,
    coste: null,
    proyectoID: null,
    estado: null,
  };

  constructor(private formBuilder:FormBuilder,
    private comisionService: ComisionService, public auth: AuthService) { }

  ngOnInit() {
    this.comisionForm = this.formBuilder.group({
        destino: ['', Validators.required],
        fechaInicio: ['', Validators.required],
        fechaFin: ['', [Validators.required]],
        sustituto: ['', [Validators.required]],
        razon: ['', Validators.required],
        coste: ['', Validators.required],
        proyecto: ['', Validators.required],

    }, {
        // validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.comisionForm.controls; }



  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.comisionForm.invalid) {
          return;
      }
      
      if (this.auth.userProfile) {
        this.comision.investigadorID = this.auth.userProfile.nickname.toUpperCase();
        this.comision.destino = this.comisionForm.controls['destino'].value;
        this.comision.fechaInicio = this.comisionForm.controls['fechaInicio'].value;
        this.comision.fechaFin = this.comisionForm.controls['fechaFin'].value;
        this.comision.sustitutoID = this.comisionForm.controls['sustituto'].value;
        this.comision.razon = this.comisionForm.controls['razon'].value;
        this.comision.coste = this.comisionForm.controls['coste'].value;
        this.comision.proyectoID = this.comisionForm.controls['coste'].value;
        this.comision.estado = "SOLICITADA";

        this.comisionService.addComision(this.comision).subscribe();
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.comision))
        return
      }
      else{
        alert('Login necesario')
      }

  }

}
