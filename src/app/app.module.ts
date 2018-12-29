import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing }  from './app.routing';
import { ComisionesComponent } from './comisiones/comisiones.component';
import { EditableComisionComponent } from './editable-comision/editable-comision.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListComisionesComponent } from './list-comisiones/list-comisiones.component';

@NgModule({
  declarations: [
    AppComponent,
    ComisionesComponent,
    EditableComisionComponent,
    LoginComponent,
    HomeComponent,
    ListComisionesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
