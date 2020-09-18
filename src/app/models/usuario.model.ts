import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ) { }

  get imagenUrl() {

    // obtiene la imagen cuando es logueado con google
    if ( this.img.includes('https')) {
      return this.img;
  }

    // obtiene la imagen cuando es logueado con usuario y password.
    if (this.img ) {
        return `${ base_url }/upload/usuarios/${this.img}`;
    } else {
      return `${ base_url }/upload/usuarios/no-image`;
    }

  }

}
