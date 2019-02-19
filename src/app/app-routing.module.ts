import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalaxyComponent } from './galaxy/galaxy.component';
import { ColoniesComponent } from './colonies/colonies.component';
import { FleetsComponent } from './fleets/fleets.component';
import { PlanetsComponent } from './planets/planets.component';
import { CommerceComponent } from './commerce/commerce.component';
import { ResearchComponent } from './research/research.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'galaxy', pathMatch: 'full' },
  { path: 'galaxy', component: GalaxyComponent },
  { path: 'colonies', component: ColoniesComponent },
  { path: 'fleets', component: FleetsComponent },
  { path: 'planets', component: PlanetsComponent },
  { path: 'commerce', component: CommerceComponent },
  { path: 'research', component: ResearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}