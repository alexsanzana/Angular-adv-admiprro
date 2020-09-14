import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      subMenu: [
        { titulo: 'Main', url: '/'},
        { titulo: 'Graficas', url: 'grafica1'},
        { titulo: 'Rxjs', url: 'rxjs'},
        { titulo: 'Promesas', url: 'promesas'},
        { titulo: 'ProgressBar', url: 'progress'},
      ]
    }
  ];

  constructor() { }
}
