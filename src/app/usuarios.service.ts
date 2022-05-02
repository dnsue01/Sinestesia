import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url='http://localhost/sinestesia/';
  
  constructor(private http: HttpClient) { }

  registro(usuario:any) {
    return this.http.post(`${this.url}registro.php`, JSON.stringify(usuario));    
  }
  
  iniciarSesion(usuario:any) {
    return this.http.post(`${this.url}iniciarSesion.php`, JSON.stringify(usuario));    
  }

  comprobarUsuario(usuario:any) {
    return this.http.post(`${this.url}comprobarUsuario.php`, JSON.stringify(usuario));    
  }

  comprobarUsuarioInicio(usuario:any) {
    return this.http.post(`${this.url}comprobarUsuarioInicio.php`, JSON.stringify(usuario));    
  }
  



}
