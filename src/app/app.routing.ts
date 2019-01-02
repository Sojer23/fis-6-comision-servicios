import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComisionesInvestigadorComponent } from './comisiones-investigador/comisiones-investigador.component';
import { ComisionesAdminComponent } from './comisiones-admin/comisiones-admin.component';
import { HomeComponent} from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { InfoComponent } from './info/info.component';
import { SolicitudComisionComponent } from './solicitud-comision/solicitud-comision.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'comisionesInvestigador', component: ComisionesInvestigadorComponent },
    { path: 'comisionesAdmin', component: ComisionesAdminComponent },
    { path: 'solicitudComision', component: SolicitudComisionComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'info', component: InfoComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);