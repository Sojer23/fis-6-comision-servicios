import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing}  from './app.routing';
import { EditableComisionComponent } from './editable-comision/editable-comision.component';
import { HomeComponent } from './home/home.component';
import { estadoFilter } from './estadoFilter.pipe';
import { ProfileComponent } from './profile/profile.component';
import { InfoComponent } from './info/info.component';
//Import Auth0 Service
import { AuthService } from './services/auth.service';
import { ComisionesInvestigadorComponent } from './comisiones-investigador/comisiones-investigador.component';
import { ComisionesAdminComponent } from './comisiones-admin/comisiones-admin.component';
import { SolicitudComisionComponent } from './solicitud-comision/solicitud-comision.component';



@NgModule({
  declarations: [
    AppComponent,
    EditableComisionComponent,
    HomeComponent,
    ProfileComponent,
    InfoComponent,
    estadoFilter,
    ComisionesInvestigadorComponent,
    ComisionesAdminComponent,
    SolicitudComisionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
