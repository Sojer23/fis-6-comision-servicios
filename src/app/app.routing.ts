import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ComisionesComponent } from './comisiones/comisiones.component';
import { HomeComponent} from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent},
    { path: 'comisiones', component: ComisionesComponent },
    { path: 'profile', component: ProfileComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);