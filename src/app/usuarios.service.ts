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
  comprobarNombreCancion(cancion: any) {
    return this.http.post(`${this.url}ComprobarCancion.php`, JSON.stringify(cancion));
  }
  insertarCancion(cancion: any) {
    return this.http.post(`${this.url}insertarCancion.php`, JSON.stringify(cancion));
  }
  recogerCancionesArtista(id: any) {
    return this.http.post(`${this.url}recogerCancionesArtista.php`, JSON.stringify(id));
  }
  borrarCancion(id: any) {
    return this.http.post(`${this.url}borrarCancion.php`, JSON.stringify(id));
  }
  comprobarNombreAlbum(cancion: any) {
    return this.http.post(`${this.url}comprobarNombreAlbum.php`, JSON.stringify(cancion));
  }
  insertarAlbum(album: any) {
    return this.http.post(`${this.url}insertarAlbum.php`, JSON.stringify(album));
  }

    recogerAlbumsArtista(id: any) {
    return this.http.post(`${this.url}recogerAlbumsArtista.php`, JSON.stringify(id));
  }
 
  borrarAlbum(id: any) {
    return this.http.post(`${this.url}borrarAlbum.php`, JSON.stringify(id));
  }
  ComprobarCancionAlbum(cancionYAlbum: any) {
    return this.http.post(`${this.url}ComprobarCancionAlbum.php`, JSON.stringify(cancionYAlbum));
  }
  insertarCancionAlbum(album: any) {
    return this.http.post(`${this.url}insertarCancionAlbum.php`, JSON.stringify(album));
  }
  recuperarAlbum(idAlbum: any) {
    return this.http.post(`${this.url}recuperarAlbum.php`, JSON.stringify(idAlbum));
  }
  recuperarCancionesAlbum(id: any) {
    return this.http.post(`${this.url}recuperarCancionesAlbum.php`, JSON.stringify(id));
  }
  recuperarCancionAlbum(id: any) {
    return this.http.post(`${this.url}recuperarCancionAlbum.php`, JSON.stringify(id));
  }
  borrarCancionAlbum(albumYcancion: any) {
    return this.http.post(`${this.url}borrarCancionAlbum.php`, JSON.stringify(albumYcancion));
  }

  recuperarId(usuario: any) {
    return this.http.post(`${this.url}recuperarId.php`, JSON.stringify(usuario));
  }
  comprobarAdmin(id: any) {
    return this.http.post(`${this.url}comprobarAdmin.php`, JSON.stringify(id));
  }
  recuperarTipoAdmin(id: any) {
    return this.http.post(`${this.url}recuperarTipoAdmin.php`, JSON.stringify(id));
  }
  recuperarNombreAdmin(id: any) {
    return this.http.post(`${this.url}recuperarNombreAdmin.php`, JSON.stringify(id));
  }
  recuperarTodosUsuarios() {
    return this.http.get(`${this.url}recuperarTodosUsuarios.php`);
  }

    recuperarTodasCanciones() {
    return this.http.get(`${this.url}recuperarTodasCanciones.php`);
  }
  AutorizarCancion(cancionYadmin:any) {
    return this.http.post(`${this.url}AutorizarCancion.php`, JSON.stringify(cancionYadmin));
  }
}



