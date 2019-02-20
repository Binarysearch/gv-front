import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class Camera {
    aspectRatio: number;
    zoom: number = 0.00002;
    x: number = 50000;
    y: number = 50000;
    gl: any;
}
