import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//importar el servicio
import { UsuariosService } from '../usuarios.service';
//imporar los json
import listadeColores from 'src/assets/json/colores.json';
import listadeTamanno from 'src/assets/json/tamannoLetra.json';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-pagina-principal-usuario',
  templateUrl: './pagina-principal-usuario.component.html',
  styleUrls: ['./pagina-principal-usuario.component.scss']
})
export class PaginaPrincipalUsuarioComponent implements OnInit {
  //lo que recivo del padre

  @Input() nombre = "";

  //lo que envio al padre


  //pasar si hay albumes y canciones
  @Output() crearBotonAnnadir: EventEmitter<any> = new EventEmitter()
  //pasar el audio de la cancion la barra
  @Output() pasarCancion: EventEmitter<any> = new EventEmitter()
  //pasar la caratula de la cancion la barra
  @Output() pasarCaratulaCancion: EventEmitter<any> = new EventEmitter()
  //pasar el titulo de la cancion la barra
  @Output() pasarTituloCancion: EventEmitter<any> = new EventEmitter()
  //pasar el id del album para acceder al otro componente
  @Output() pasarIdAlbum: EventEmitter<any> = new EventEmitter()


  idAlbum = "";

  //playlisit
  playList = {
    Id_playlist: "",
    Nombre: "",
    foto: "",
    Id_usuario: ""

  }

  //si es estandar o artista
  estandar: boolean = true;

  //usario
  usuario = {
    id: "",
    correo: "",
    nombre: "",
    contrasennaEncrip: "",
    tamanno_letra: "",
    color_fondo: "",
    color_fuente: "",
  }

  //canciones cuando es artista
  CancionesArtista: any;
  hayCanciones: boolean = true;
  cancionTitulo = "";
  cancionCaratula = "";
  //albumes cuando es artista
  albumesArtista: any;
  hayAlbumes: boolean = true;

  //si hay una cancion y un album le paso la informacion al padre
  albumYcancion: boolean = false;

  //cancion
  cancion = {
    Id_cancion: "",
    Nombre: "",
    Url_cancion: "",
    Url_caratula: "",
    Id_artista: "",
    Id_album: "",
    explicita: "",
    Autorizada: ""
  }

  //cancion a reproducir
  cancionRepro: any;

  //canciones que hay dentro de su playlist
  cancionesPlaylist: any = [];

  //saber caratula cancion
  caratula: string = "";

  //colores de la bd
  colorLetra: string = this.usuario.color_fuente;
  colorFondo: string = this.usuario.color_fondo;
  tamannoLetra: string = this.usuario.tamanno_letra;

  //paso el id del usuario y la foto
  idYFoto = {
    id: "",
    nombre: "",
    extension: ""
  }
  //id cancion y playlist
  idCancionYPlayList = {
    idcancion: "",
    idPlaylist: ""
  }
  //Colores de json
  colores: any = listadeColores;
  coloresSelecionables: any;

  //Tamanno de json
  tamanno: any = listadeTamanno;
  tamannoSeleccionable: any;

  //url donde estan las fotos del servidor
  urlFotos = 'http://localhost/sinestesia/contenido/fotos/';
  //url donde estan las canciones del servidor
  urlCanciones = 'http://localhost/sinestesia/contenido/canciones/';

  constructor(private usuariosServicio: UsuariosService) { }

  ngOnInit(): void {
    this.recuperarUsuario();
  }
  //recuperar el usuario de la bd
  recuperarUsuario() {
    this.usuariosServicio.recuperarUsuario(this.nombre).subscribe((datos: any) => {
      this.usuario.id = datos[0];
      this.usuario.correo = datos[1];
      this.usuario.nombre = datos[2];
      this.usuario.contrasennaEncrip = datos[3];
      this.usuario.tamanno_letra = datos[4];
      this.usuario.color_fondo = datos[5];
      this.usuario.color_fuente = datos[6];

      //colores y tamaños
      this.coloresSelecionables = this.colores.colors
      this.tamannoSeleccionable = this.tamanno.Tamannos
      //metodos
      this.recuperarTipoUsuario();
      this.recuperarFoto();
      this.cambiarIdATamanno(datos[4])
      this.cambiarIdAColorFondo(datos[5])
      this.cambiarIdAColorLetra(datos[6])

    });
  }

  //comprobar que tipo de usuario es
  recuperarTipoUsuario() {
    this.usuariosServicio.RecuperarTipoUsuario(this.usuario.id).subscribe((datos: any) => {
      this.estandar = datos["mensaje"]

      //metodos si es estadar
      if (this.estandar) {

        this.comprobarListaPersonal();
      } else {
        //metodos artista
        this.recogerAlbumesArtista();
        this.recogerCancionesArtista();

      }
    });
  }
  //recoger la foto de la base de datos
  recuperarFoto() {
    this.usuariosServicio.RecuperarFoto(this.usuario.id).subscribe((datos: any) => {
      this.idYFoto.extension = datos['mensaje']
    })
  }


  //personalizacion

  cambiarIdAColorFondo(idColor: any) {
    for (let i = 0; i < this.coloresSelecionables.length; i++) {
      if (this.coloresSelecionables[i].id == idColor) {
        this.colorFondo = this.coloresSelecionables[i].color
      }
    }
  }

  cambiarIdATamanno(idtamanno: any) {
    for (let i = 0; i < this.tamannoSeleccionable.length; i++) {
      if (this.tamannoSeleccionable[i].id == idtamanno) {
        this.tamanno = this.tamannoSeleccionable[i].tamanno
      }
    }
  }

  cambiarIdAColorLetra(idColor: any) {
    for (let i = 0; i < this.coloresSelecionables.length; i++) {
      if (this.coloresSelecionables[i].id == idColor) {
        this.colorLetra = this.coloresSelecionables[i].color
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////

  //metodos si es usuario artista


  recogerCancionesArtista() {
    this.usuariosServicio.recogerCancionesArtista(this.usuario.id).subscribe((datos: any) => {
      this.CancionesArtista = datos;
      //si no hay declaro la variable a false
      if (this.CancionesArtista.length == 0) {
        this.hayCanciones = false;
      } else {
        //si hay canciones compruebo si tambien hay albumes
        if (this.hayAlbumes) {
          this.albumYcancion = true;
          this.crearBotonAnnadir.emit(this.albumYcancion)
        }
      }

    })
  }

  recogerAlbumesArtista() {
    this.usuariosServicio.recogerAlbumsArtista(this.usuario.id).subscribe((datos: any) => {
      this.albumesArtista = datos;
      //si no hay declaro la variable a false
      if (this.albumesArtista.length == 0) {
        this.hayAlbumes = false;

      } else {
        //si hay albumes compruebo que tambien haya canciones
        if (this.hayCanciones) {
          this.albumYcancion = true;
          this.crearBotonAnnadir.emit(this.albumYcancion)
        }
      }

    })
  }
  //reproducir en la barra lateral
  sacarCancion(cancion: any) {
    this.cancionRepro = cancion;
    //pasar cancion al padre
    this.pasarCancion.emit(this.cancionRepro)


  }
  pasarTitulo(cancion: any) {
    this.cancionTitulo = cancion;
    //pasar titulo cancion al padre
    this.pasarTituloCancion.emit(this.cancionTitulo)

  }
  pasarCaratula(cancion: any) {
    this.cancionCaratula = cancion;
    //pasar caratula
    this.pasarCaratulaCancion.emit(this.cancionCaratula)

  }

  detalleAlbum(albumId: any) {
    this.idAlbum = albumId;
    this.pasarIdAlbum.emit(this.idAlbum)

  }

  borrarCan(idCancion: any) {

    Swal.fire({

      title: '¿Estas seguro?',
      text: "No podras recuperarla una vez borrada!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, quiero borrarla !',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        //metodo de borar
        this.borrarCancion(idCancion);

      } else if (
        //si le da a cancelar
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado!',
          'Tu cancion esta a salvo',
          'info'
        )
      }
    })


  }
  borrarAlbu(idAlbum: any) {

    Swal.fire({

      title: '¿Estas seguro?',
      text: "No podras recuperarlo una vez borrado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, quiero borrarlo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        //metodo de borar
        this.borrarAlbum(idAlbum);
        //si es menor que cero la opcion de añadir canciones se quita
        if (this.albumesArtista.length < 0) {
          this.albumYcancion = true;
          this.crearBotonAnnadir.emit(this.albumYcancion)
        }


      } else if (
        //si le da a cancelar
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado!',
          'Tu album esta a salvo',
          'info'
        )
      }
    })


  }


  borrarCancion(idCancion: any) { 
    this.recogerCancionUrl(idCancion);

  }

  recogerCancionUrl(idCancion: any) {
    this.usuariosServicio.recogerCancionUrl(idCancion).subscribe((datos: any) => {


      this.borrarArchivoCancion(datos[0]);
      this.borrarArchivoImg(datos[1]);

      this.usuariosServicio.borrarCancion(idCancion).subscribe((datos: any) => {
     
        if (datos['resultado'] == 'OK') {
          Swal.fire(
            'Borrado!',
            'Tu cancion ha sido borrada con éxito!',
            'success'
          )
          this.recogerCancionesArtista();
        }
  
      })
      
    })
  }

  borrarArchivoCancion(archivo:any){
    this.usuariosServicio.borrarArchivoCancion(archivo).subscribe((datos:any)=>{
     
    })
  }
  borrarArchivoImg(archivo:any){
    this.usuariosServicio.borrarArchivoImg(archivo).subscribe((datos:any)=>{
     
    })
  }


  borrarAlbum(idAlbum: any) {
    this.usuariosServicio.borrarAlbum(idAlbum).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        Swal.fire(
          'Borrado!',
          'Tu album ha sido borrado con éxito!',
          'success'
        )
        this.recogerAlbumesArtista();

      }

    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  //metodos si es usuario estandar

  comprobarListaPersonal() {

    this.usuariosServicio.comprobarPlaylistUnica(this.usuario.id).subscribe((datos: any) => {

      this.recuperarPlaylistUnica()

    })
  }
  recuperarPlaylistUnica() {

    this.usuariosServicio.recuperarPlaylistUnica(this.usuario.id).subscribe((datos: any) => {
      this.playList.Id_playlist = datos[0]
      this.idCancionYPlayList.idPlaylist = this.playList.Id_playlist
      this.playList.Nombre = datos[1]
      this.playList.foto = datos[2]
      this.playList.Id_usuario = datos[3]
      this.recuperarCanionesPlaylistUnica()
    })
  }

  recuperarCanionesPlaylistUnica() {
    this.usuariosServicio.recuperarCanionesPlaylist(this.playList.Id_playlist).subscribe((datos: any) => {
      if (datos.length == 0) {
        this.hayCanciones = false
      } else {
        for (let i = 0; i < datos.length; i++) {
          const cancion = datos[i][0];
          this.recuperarCancionPlaylist(cancion)

        }
      }
    })
  }


  recuperarCancionPlaylist(idcancion: any) {
    this.usuariosServicio.recuperarCancionPlaylist(idcancion).subscribe((datos: any) => {
      this.cancionesPlaylist.push(datos)

    })
  }

  borrarCanPlay(idCancion: any) {


    Swal.fire({

      title: '¿Estas seguro?',
      text: "Se eliminara esta cancionde la playlist!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, quiero borrarla!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.idCancionYPlayList.idcancion = idCancion
        //metodo de borar
        this.borrarCancionPlaylist(this.idCancionYPlayList);
        this.cancionesPlaylist = []

        this.comprobarListaPersonal()

      } else if (
        //si le da a cancelar
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado!',
          'Tu cancion esta a salvo',
          'info'
        )
      }
    })

  }

  borrarCancionPlaylist(idcancion: any) {
    this.usuariosServicio.borrarCancionPlaylist(idcancion).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        Swal.fire(
          'Borrada!',
          'Tu cancion ha sido borrado con éxito!',
          'success'
        )
      }

    })
  }
}




