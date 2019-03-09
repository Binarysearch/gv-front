import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalaxyComponent } from './galaxy/galaxy.component';
import { ColoniesComponent } from './colonies/colonies.component';
import { FleetsComponent } from './fleets/fleets.component';
import { PlanetsComponent } from './planets/planets.component';
import { CommerceComponent } from './commerce/commerce.component';
import { ResearchComponent } from './research/research.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth-guard.service';
import { LandingComponent } from './landing/landing.component';
import { SelectGalaxyGuard } from './services/select-galaxy-guard.service';
import { GalaxiesComponent } from './galaxies/galaxies.component';
import { CivilizationsComponent } from './civilizations/civilizations.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'galaxies', component: GalaxiesComponent, canActivate: [AuthGuard] },
  { path: 'galaxy', component: GalaxyComponent, canActivate: [SelectGalaxyGuard] },
  { path: 'civilizations', component: CivilizationsComponent, canActivate: [AuthGuard, SelectGalaxyGuard] },
  { path: 'colonies', component: ColoniesComponent, canActivate: [AuthGuard, SelectGalaxyGuard] },
  { path: 'fleets', component: FleetsComponent, canActivate: [AuthGuard, SelectGalaxyGuard] },
  { path: 'planets', component: PlanetsComponent, canActivate: [AuthGuard, SelectGalaxyGuard] },
  { path: 'commerce', component: CommerceComponent, canActivate: [AuthGuard, SelectGalaxyGuard] },
  { path: 'research', component: ResearchComponent, canActivate: [AuthGuard, SelectGalaxyGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
