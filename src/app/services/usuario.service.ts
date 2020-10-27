import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone ) {
    this.googleInit();
   }

   get token(): string {
     return localStorage.getItem('token') || '';
   }

   get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
     return this.usuario.role;
   }

   get uid(): string {
    return this.usuario.uid || '';
   }

   get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  googleInit() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '654509965090-vea4fd0utpk1i6jues3i0e5lfe5vbh04.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }


  guardarLocalStorage( token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, this.headers)
    .pipe(
      map((resp: any) => {

        const { email, google, nombre, role, img = 'drop-images', uid } = resp.usuario;
        this.usuario = new Usuario (nombre, email, '', img, google, role, uid);
        this.guardarLocalStorage( resp.token, resp.menu);
        return true;
      }),
      catchError(error => of(false))
      // esto es para no romper el ciclo, retorna un nuevo Observable
      // regresa un nuevo observable con un false que significa que no logro hacer la autenticación
    );

  }

  crearUsuario( formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
                .pipe(
                  tap((resp: any) => {
                    this.guardarLocalStorage( resp.token, resp.menu);
                  })
                );
  }

  actualizarPerfil(data: {email: string, nombre: string, role: string}) {

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${ this.uid }`, data, this.headers);

  }

  login( formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap((resp: any) => {
                    this.guardarLocalStorage( resp.token, resp.menu);
                  })
                );
  }

  loginGoogle( token ) {
    return this.http.post(`${base_url}/login/google`, { token })
                .pipe(
                  tap((resp: any) => {
                    this.guardarLocalStorage( resp.token, resp.menu);
                  })
                );
  }

  cargarUsuarios(desde: number ) {
    const url = `${ base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
        .pipe(
          map( resp => {
            const usuarios = resp.usuarios.map(
              user => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
              );
            return {
              total: resp.total,
              usuarios
            };
          })
        );
  }


  eliminarUsuario( usuario: Usuario ) {
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this.http.delete(url, this.headers);
  }


  guardarUsuario(usuario: Usuario ) {
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }


}
