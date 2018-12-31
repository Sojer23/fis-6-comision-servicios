import { Component, OnInit } from '@angular/core';
import { ComisionService } from '../comision.service';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comision } from '../comision';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-solicitud-comision',
  templateUrl: './solicitud-comision.component.html',
  styleUrls: ['./solicitud-comision.component.css']
})

export class SolicitudComisionComponent implements OnInit {

  comisionID: String = null;
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

  constructor(private formBuilder:FormBuilder, private route: ActivatedRoute,
    private router: Router, private comisionService: ComisionService, 
    public auth: AuthService) { }

  
  // async loadFormAsync(comisionID:String) {
  //   let asyncResult = await this.comisionService.getComision(comisionID).toPromise();
  //   this.comision = asyncResult[0];
  //   this.createForm();
  //   return asyncResult;
  // }

  async getAsyncData(comisionID:String) {
    return await this.comisionService.getComision(comisionID).toPromise();
  }

  ngOnInit() {
    this.createForm();

    this.route.queryParams.subscribe(
      params => {this.comisionID = params['comisionID'] || null;}
    );
    
    // Si recibimos por parámetro comisionID se trata de un update, obtenemos esa comisión
    if(this.comisionID){
      this.getAsyncData(this.comisionID).then(comisiones =>{
        this.comision = comisiones[0];
        this.loadFormValues();
      });
    }
    

  }

  // convenience getter for easy access to form fields
  get f() { return this.comisionForm.controls; }


  createForm(){
    console.log(formatDate(Date()+1, 'yyyy-MM-dd', 'en-US'))
    this.comisionForm = this.formBuilder.group({
      destino: ['' , Validators.required],
      fechaInicio: [ formatDate(Date(), 'yyyy-MM-dd', 'en-US') , Validators.required],
      fechaFin: [formatDate(Date()+1, 'yyyy-MM-dd', 'en-US')  , [Validators.required]],
      sustitutoID: ['', [Validators.required]],
      razon: ['', Validators.required],
      coste: ['', Validators.required],
      proyecto: ['', Validators.required],

  }, {
      // Poner aqui mas funciones de validación
      // validator: MustMatch('password', 'confirmPassword')
  })
  }

  loadFormValues(){
    this.comisionForm.setValue({
      destino: this.comision.destino,
      fechaInicio: formatDate(this.comision.fechaInicio,'yyyy-MM-dd','en-US'),
      fechaFin: formatDate(this.comision.fechaFin,'yyyy-MM-dd','en-US'),
      sustitutoID: this.comision.sustitutoID,
      razon: this.comision.razon,
      coste : this.comision.coste,
      proyecto: this.comision.proyectoID
    });
  }

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
        this.comision.sustitutoID = this.comisionForm.controls['sustitutoID'].value;
        this.comision.razon = this.comisionForm.controls['razon'].value;
        this.comision.coste = this.comisionForm.controls['coste'].value;
        this.comision.proyectoID = this.comisionForm.controls['coste'].value;
        this.comision.estado = "SOLICITADA";
        
        if(this.comisionID){
          this.comisionService.updateComision(this.comision).subscribe();
        }
        else{
          this.comisionService.addComision(this.comision).subscribe();
        }
        this.router.navigate(['/comisionesInvestigador']);
      }
      else{
        alert('Login necesario')
      }

  }

}
