import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComisionesInvestigadorComponent } from './comisiones-investigador/comisiones-investigador.component';
import { ComisionesAdminComponent } from './comisiones-admin/comisiones-admin.component';
import { HomeComponent} from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AddComisionComponent} from './add-comision/add-comision.component'

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'comisionesInvestigador', component: ComisionesInvestigadorComponent },
    { path: 'comisionesAdmin', component: ComisionesAdminComponent },
    { path: 'addComision', component: AddComisionComponent},
    { path: 'profile', component: ProfileComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);