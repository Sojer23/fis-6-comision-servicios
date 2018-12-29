import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ComisionesComponent } from './comisiones/comisiones.component';
import { EditableComisionComponent } from './editable-comision/editable-comision.component';

@NgModule({
  declarations: [
    AppComponent,
    ComisionesComponent,
    EditableComisionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
