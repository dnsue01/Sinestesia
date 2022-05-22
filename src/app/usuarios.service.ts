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
  AutorizarCancion(cancionYadmin: any) {
    return this.http.post(`${this.url}AutorizarCancion.php`, JSON.stringify(cancionYadmin));
  }
  borrarUsuario(idUsuario: any) {
    return this.http.post(`${this.url}borrarUsuario.php`, JSON.stringify(idUsuario));
  }
  comprobarPlaylistUnica(idUsuario: any) {
    return this.http.post(`${this.url}comprobarPlaylistUnica.php`, JSON.stringify(idUsuario));
  }
  recuperarPlaylistUnica(idUsuario: any) {
    return this.http.post(`${this.url}recuperarPlaylistUnica.php`, JSON.stringify(idUsuario));
  }
  insertarPlaylist(playlist: any) {
    return this.http.post(`${this.url}insertarPlaylist.php`, JSON.stringify(playlist));
  }
   recogerPlayListUsuario(idUsuario: any) {
    return this.http.post(`${this.url}recogerPlayListUsuario.php`, JSON.stringify(idUsuario));
  }
  borrarPlaylist(idUsuario: any) {
    return this.http.post(`${this.url}borrarPlaylist.php`, JSON.stringify(idUsuario));
  }
  recuperarNuevasCanciones() {
    return this.http.get(`${this.url}recuperarNuevasCanciones.php`);
  }
  recuperarNuevosArtistas() {
    return this.http.get(`${this.url}recuperarNuevosArtistas.php`);
  }
  recogerArtista(idUsuario: any) {
    return this.http.post(`${this.url}recogerArtista.php`, JSON.stringify(idUsuario));
  }
  comprobarCanionPlaylist(idCancionYidPlaylist: any) {
    return this.http.post(`${this.url}comprobarCancionPlaylist.php`, JSON.stringify(idCancionYidPlaylist));
  }
  insertarCanionPlaylist(idCancionYidPlaylist: any) {
    return this.http.post(`${this.url}insertarCancionPlaylist.php`, JSON.stringify(idCancionYidPlaylist));
  }
  recuperarCanionesPlaylist(idPlaylist: any) {
    return this.http.post(`${this.url}recuperarCancionesPlaylist.php`, JSON.stringify(idPlaylist));
  }

  recuperarCancionPlaylist(idCancion: any) {
    return this.http.post(`${this.url}recuperarCancionPlaylist.php`, JSON.stringify(idCancion));
  }

  borrarCancionPlaylist(idCancion: any) {
    return this.http.post(`${this.url}borrarCancionPlaylist.php`, JSON.stringify(idCancion));
  }

  recuperarPlaylist(idPlaylist: any) {
    return this.http.post(`${this.url}recuperarPlaylist.php`, JSON.stringify(idPlaylist));
  }
  comprobarEdad(idUsuario: any) {
    return this.http.post(`${this.url}comprobarEdad.php`, JSON.stringify(idUsuario));
  }
  recogerPaises() {
    return this.http.get(`${this.url}recogerPaises.php`);
  }
  recogerArtistasPais(nombrePais: any) {
    return this.http.post(`${this.url}recogerArtistasPais.php`, JSON.stringify(nombrePais));
  }
  CancionesBuscadas(palabra: any) {
    return this.http.post(`${this.url}CancionesBuscadas.php`, JSON.stringify(palabra));
  }
  artistasBuscados(palabra: any) {
    return this.http.post(`${this.url}artistasBuscados.php`, JSON.stringify(palabra));
  }
  albumesBuscados(palabra: any) {
    return this.http.post(`${this.url}buscarAlbumes.php`, JSON.stringify(palabra));
  }
  recogerCancionUrl(idCancion: any) {
    return this.http.post(`${this.url}recogerCancionUrl.php`, JSON.stringify(idCancion));
  }
  borrarArchivoCancion(nombreArchivo: any) {
    return this.http.post(`${this.url}borrarArchivoCancion.php`, JSON.stringify(nombreArchivo));
  }
  borrarArchivoImg(nombreArchivo: any) {
    return this.http.post(`${this.url}borrarArchivoImg.php`, JSON.stringify(nombreArchivo));
  }
}



