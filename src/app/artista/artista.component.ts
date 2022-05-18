import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
//importar el servicio
import { UsuariosService } from '../usuarios.service';
//imporar los json
import listadeColores from 'src/assets/json/colores.json';
import listadeTamanno from 'src/assets/json/tamannoLetra.json';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.scss']
})
export class ArtistaComponent implements OnInit {

  //recoger el nombre
  @Input() nombre = "";
  //nombre artista
  @Input() nombreArtista = "";

  //pasar el audio de la cancion la barra
  @Output() pasarCancion: EventEmitter<any> = new EventEmitter()
  //pasar la caratula de la cancion la barra
  @Output() pasarCaratulaCancion: EventEmitter<any> = new EventEmitter()
  //pasar el titulo de la cancion la barra
  @Output() pasarTituloCancion: EventEmitter<any> = new EventEmitter()

  //pasar el id del album para acceder al otro componente
  @Output() pasarIdAlbum: EventEmitter<any> = new EventEmitter()

  //parametros para pasar al padre
  cancionTitulo = "";
  cancionCaratula = "";
  //cancion a reproducir
  cancionRepro: any;
//id del album que paso
  idAlbum = "";

  //paso el id del usuario y la foto
  idYFoto = {
    id: "",
    nombre: "",
    extension: ""
  }

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



  //usario
  artista = {
    id: "",
    correo: "",
    nombre: "",
    contrasennaEncrip: "",
    tamanno_letra: "",
    color_fondo: "",
    color_fuente: "",
  }

  playlists: any = [];
  //id de cancion y playlist para mandar a la bd
  idCancionYPlayList = {
    idcancion: "",
    idPlaylist: ""
  }
  //cancion seleccionada para añadir
  seleccionado: boolean = false

  //colores de la bd
  colorLetra: string = this.usuario.color_fuente;
  colorFondo: string = this.usuario.color_fondo;
  tamannoLetra: string = this.usuario.tamanno_letra;
  //colores defecto del boton
  colorBotonFondo: string = this.colorLetra;
  colorBotonLetra: string = this.colorFondo;

  //Colores de json
  colores: any = listadeColores;
  coloresSelecionables: any;

  //Tamanno de json
  tamanno: any = listadeTamanno;
  tamannoSeleccionable: any;

  //url donde estan las fotos del servidor
  urlFotos = 'http://localhost/sinestesia/contenido/fotos/';

  //albumes cuando es artista
  albumesArtista: any;
  hayAlbumes: boolean = true;
  //canciones del artista
  CancionesArtista: any;
  hayCanciones: boolean = true;

  constructor(private usuariosServicio: UsuariosService) { }

  ngOnInit(): void {
    this.recuperarUsuario()
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
      this.cambiarIdATamanno(datos[4]);
      this.cambiarIdAColorFondo(datos[5]);
      this.cambiarIdAColorLetra(datos[6]);
      this.recuperarArtista()
      this.recogerPlayListUsuario()
    })
  }


  recuperarArtista() {
    this.usuariosServicio.recuperarUsuario(this.nombreArtista).subscribe((datos: any) => {

      this.artista.id = datos[0];
      this.artista.correo = datos[1];
      this.artista.nombre = datos[2];
      this.artista.contrasennaEncrip = datos[3];
      this.artista.tamanno_letra = datos[4];
      this.artista.color_fondo = datos[5];
      this.artista.color_fuente = datos[6];
      this.recogerAlbumesArtista()
      this.recogerCancionesArtista()
      this.recuperarFoto()
    })
  }


  //recoger la foto de la base de datos
  recuperarFoto() {
    this.usuariosServicio.RecuperarFoto(this.artista.id).subscribe((datos: any) => {
      this.idYFoto.extension = datos['mensaje']
    })
  }
  //recoger canciones
  recogerCancionesArtista() {
    this.usuariosServicio.recogerCancionesArtista(this.artista.id).subscribe((datos: any) => {
      this.CancionesArtista = datos;
      //si no hay declaro la variable a false
      if (this.CancionesArtista.length == 0) {
        this.hayCanciones = false;
      }

    })
  }

  //recuperar albumes del artista
  recogerAlbumesArtista() {
    this.usuariosServicio.recogerAlbumsArtista(this.artista.id).subscribe((datos: any) => {
      this.albumesArtista = datos;
      //si no hay declaro la variable a false
      if (this.albumesArtista.length == 0) {
        this.hayAlbumes = false;
      }

    })
  }
  detalleAlbum(albumId: any) {
    this.idAlbum = albumId;
    this.pasarIdAlbum.emit(this.idAlbum)

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
//Añadir cancion a playlist 

  //seleccionar el id de la cancion
  AnnadirPlaylist(idCancion: any) {
    this.idCancionYPlayList.idcancion = idCancion;
    this.seleccionado = true
  }
  //seleccionar el id de la playlist
  seleccionarPlaylist(e: any) {
    this.idCancionYPlayList.idPlaylist = e.target.value
  }

  annadirCan() {
    if(this.idCancionYPlayList.idPlaylist != ""){
   
    this.usuariosServicio.comprobarCanionPlaylist(this.idCancionYPlayList).subscribe((datos: any) => {
      if (datos["mensaje"]) {

        Swal.fire({

          title: '¿Estas seguro?',
          text: "Esta cancion ya esta en esta playlist!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, quiero añadirla!',
          cancelButtonText: 'No, cancelar!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {

            //metodo de insertar
            this.insertarCancionPlaylist()
            this.seleccionado=false;

          } else if (
            //si le da a cancelar
            result.dismiss === Swal.DismissReason.cancel
          ) {
            this.seleccionado=false;
            Swal.fire(
              'Cancelado!',
              'Tu cancion no se ha añadido',
              'info'
            )
          }
        })

      } else {
        this.insertarCancionPlaylist()
        this.seleccionado=false;
      }
    })
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes de seleccionar una playlist ',
    })
  }
}

  insertarCancionPlaylist() {
    this.usuariosServicio.insertarCanionPlaylist(this.idCancionYPlayList).subscribe((datos: any) => {
      if (datos["resultado"] == "OK") {
        Swal.fire({
          icon: 'success',
          title: 'Añadida correctamente',
          showConfirmButton: false,
          timer: 300
        })
      }
    })
  }



  //recoger las playlist del usuario
  recogerPlayListUsuario() {
    this.usuariosServicio.recogerPlayListUsuario(this.usuario.id).subscribe((datos: any) => {
      this.playlists = datos;  
    })
  }





  //personalizacion

  cambiarIdAColorFondo(idColor: any) {
    for (let i = 0; i < this.coloresSelecionables.length; i++) {
      if (this.coloresSelecionables[i].id == idColor) {
        this.colorFondo = this.coloresSelecionables[i].color
        this.colorBotonLetra = this.colorFondo
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
        this.colorBotonFondo = this.colorLetra
      }
    }
  }

}
