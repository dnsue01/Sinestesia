import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = 'http://localhost/sinestesia/';

  constructor(private http: HttpClient) { }

  registro(usuario: any) {
    return this.http.post(`${this.url}registro.php`, JSON.stringify(usuario));
  }

  iniciarSesion(usuario: any) {
    return this.http.post(`${this.url}iniciarSesion.php`, JSON.stringify(usuario));
  }

  comprobarUsuario(usuario: any) {
    return this.http.post(`${this.url}comprobarUsuario.php`, JSON.stringify(usuario));
  }

  comprobarUsuarioInicio(usuario: any) {
    return this.http.post(`${this.url}comprobarUsuarioInicio.php`, JSON.stringify(usuario));
  }

  recuperarNombre(usuario: any) {
    return this.http.post(`${this.url}recuperarNombre.php`, JSON.stringify(usuario));
  }

  recuperarUsuario(nombre: any) {
    return this.http.post(`${this.url}recuperarUsuario.php`, JSON.stringify(nombre));
  }

  comprobarContrasennaBD(usuario: any) {
    return this.http.post(`${this.url}comprobarContrasennaBD.php`, JSON.stringify(usuario));
  }
  ActualizarContrasenna(usuario: any) {
    return this.http.post(`${this.url}ActualizarContrasenna.php`, JSON.stringify(usuario));
  }

  ActualizarFoto(idYFoto: any) {
    return this.http.post(`${this.url}ActualizarFoto.php`, JSON.stringify(idYFoto));
  }
  RecuperarFoto(usuario: any) {
    return this.http.post(`${this.url}RecuperarFoto.php`, JSON.stringify(usuario));
  }
  RecuperarTipoUsuario(id: any) {
    return this.http.post(`${this.url}RecuperarTipoUsuario.php`, JSON.stringify(id));
  }
  Personalizar(usuario: any) {
    return this.http.post(`${this.url}Personalizar.php`, JSON.stringify(usuario));
  }

}



