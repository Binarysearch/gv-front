import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  private _strings = {
    galaxy: "Galaxia",
    colonies: "Colonias",
    fleets: "Flotas",
    planets: "Planetas",
    commerce: "Comercio",
    research: "Investigación",
    logout: "Cerrar sesión",
    register: "Registrar",
    login: "Iniciar Sesión"
  };

  constructor() { }

  get strings() {
    return this._strings;
  }
}
