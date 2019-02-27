import { HttpInterceptorService } from './services/http-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { GalaxyComponent } from './galaxy/galaxy.component';
import { ColoniesComponent } from './colonies/colonies.component';
import { FleetsComponent } from './fleets/fleets.component';
import { PlanetsComponent } from './planets/planets.component';
import { CommerceComponent } from './commerce/commerce.component';
import { ResearchComponent } from './research/research.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';
import { GalaxiesComponent } from './galaxies/galaxies.component';
import { StarSystemWindowComponent } from './galaxy/star-system-window/star-system-window.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    FooterComponent,
    GalaxyComponent,
    ColoniesComponent,
    FleetsComponent,
    PlanetsComponent,
    CommerceComponent,
    ResearchComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    GalaxiesComponent,
    StarSystemWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
