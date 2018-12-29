import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ComisionesInvestigadorComponent } from './comisiones-investigador/comisiones-investigador.component';
import { HomeComponent} from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AddComisionComponent} from './add-comision/add-comision.component'

const appRoutes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent},
    { path: 'comisionesInvestigador', component: ComisionesInvestigadorComponent },
    { path: 'addComision', component: AddComisionComponent},
    { path: 'profile', component: ProfileComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);