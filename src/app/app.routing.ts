import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ComisionesComponent } from './comisiones/comisiones.component';
import { HomeComponent} from './home/home.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent},
    { path: 'comisiones', component: ComisionesComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);