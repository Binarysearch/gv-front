import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  private _strings = {
    galaxy: 'Galaxia',
    star: 'Estrella',
    starSystem: 'Sistema estelar',
    colonies: 'Colonias',
    fleets: 'Flotas',
    planets: 'Planetas',
    commerce: 'Comercio',
    research: 'Investigación',
    logout: 'Cerrar sesión',
    register: 'Crear una cuenta',
    login: 'Iniciar Sesión',
    password: 'Contraseña',
    repeatPassword: 'Repetir Contraseña',
    email: 'Email',
    name: 'Nombre',
    send: 'Enviar',
    home: 'Inicio',
    type: 'Tipo',
    size: 'Tamaño',
    loading: 'Cargando',
    createCivilization: 'Crear civilización',
    civilizationName: 'Nombre de la civilización',
    invalidCivilizationName: 'Nombre de civilización invalido: debe tener al menos 3 caracteres y no empezar ni acabar con espacio.',
    invalidHomeStarName: 'Nombre de estrella invalido: debe tener al menos 3 caracteres y no empezar ni acabar con espacio.',
    civilizationNameExists: 'Ese nombre de civilización ya existe en esta galaxia',
    homeStarName: 'Nombre de la estrella inicial',
    selectGalaxy: 'Seleccionar galaxia',
    invalidLoginCredentials: 'Email o Contraseña incorrecta',
    passwordsDontMatch: 'Las contraseñas no coinciden'
  };

  constructor() { }

  get strings() {
    return this._strings;
  }
}
