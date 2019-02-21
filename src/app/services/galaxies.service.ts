import { Injectable } from '@angular/core';

export interface Galaxy{
  id: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class GalaxiesService {

  constructor() { }
}
