import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing}  from './app.routing';
import { EditableComisionComponent } from './editable-comision/editable-comision.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { estadoFilter } from './estadoFilter.pipe';
import { ProfileComponent } from './profile/profile.component';

//Import Auth0 Service
import { AuthService } from './services/auth.service';
import { ComisionesInvestigadorComponent } from './comisiones-investigador/comisiones-investigador.component';
import { AddComisionComponent } from './add-comision/add-comision.component';
import { ComisionesAdminComponent } from './comisiones-admin/comisiones-admin.component';



@NgModule({
  declarations: [
    AppComponent,
    EditableComisionComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    estadoFilter,
    ComisionesInvestigadorComponent,
    AddComisionComponent,
    ComisionesAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
