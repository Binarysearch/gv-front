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
    register: "Crear una cuenta",
    login: "Iniciar Sesión",
    password: "Contraseña",
    repeatPassword: "Repetir Contraseña",
    email: "Email",
    send: "Enviar",
    home: "Inicio",
    invalidLoginCredentials: "Email o Contraseña incorrecta",
    passwordsDontMatch: "Las contraseñas no coinciden"
  };

  constructor() { }

  get strings() {
    return this._strings;
  }
}
