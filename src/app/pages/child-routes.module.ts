import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
  { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress Bar'} },
  { path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'Busqueda'} },
  { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica #1'} },
  { path: 'account-setting', component: AccountSettingComponent, data: {titulo: 'Ajuste de Cuenta'} },
  { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
  { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'} },
  { path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'} },
  // mantenimientos

  { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'} },
  { path: 'medicos', component: MedicosComponent, data: {titulo: 'mantenimiento de Medicos'} },
  { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'mantenimiento de Medico'} },

  // Rurtas de Admin
  { path: 'usuarios', canActivate: [ AdminGuard ],  component: UsuariosComponent, data: {titulo: 'Mantenimineto de Usuarios'} },
]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
