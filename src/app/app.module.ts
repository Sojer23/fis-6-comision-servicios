import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing}  from './app.routing';
import { ComisionesComponent } from './comisiones/comisiones.component';
import { EditableComisionComponent } from './editable-comision/editable-comision.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListComisionesComponent } from './list-comisiones/list-comisiones.component';
import { estadoFilter } from './estadoFilter.pipe';
import { ProfileComponent } from './profile/profile.component';

//Import Auth0 Service
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [
    AppComponent,
    ComisionesComponent,
    EditableComisionComponent,
    LoginComponent,
    HomeComponent,
    ListComisionesComponent,
    ProfileComponent,
    estadoFilter
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
