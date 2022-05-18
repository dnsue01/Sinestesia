
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

//servicio
import { UsuariosService } from '../usuarios.service';

//imporar los json
import listadeColores from 'src/assets/json/colores.json';
import listadeTamanno from 'src/assets/json/tamannoLetra.json';
//alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  //recoger el i del album
  @Input() idPlaylist = "";

  //recoger el nombre
  @Input() nombre = "";


  //pasar el audio de la cancion la barra
  @Output() pasarCancion: EventEmitter<any> = new EventEmitter()
  //pasar la caratula de la cancion la barra
  @Output() pasarCaratulaCancion: EventEmitter<any> = new EventEmitter()
  //pasar el titulo de la cancion la barra
  @Output() pasarTituloCancion: EventEmitter<any> = new EventEmitter()


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
  //playlisit
  playList = {
    Id_playlist: "",
    Nombre: "",
    foto: "",
    Id_usuario: ""

  }
  //cancion
  cancion = {
    Id_cancion: "",
    Nombre: "",
    Url_cancion: "",
    Url_caratula: "",
    Id_artista: "",
    Id_adminAu: "",
    explicita: "",
    Autorizada: ""
  }
  //parametros para pasar al padre
  cancionTitulo = "";
  cancionCaratula = "";
  //cancion a reproducir
  cancionRepro: any;

  //canciones que hay dentro de su playlist
  cancionesPlaylist: any = [];

  //id cancion y playlist
  idCancionYPlayList = {
    idcancion: "",
    idPlaylist: ""
  }

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

  //canciones album
  CancionesPlaylist: any = [];
  hayCanciones: boolean = true;

  //url donde estan las fotos del servidor
  urlFotos = 'http://localhost/sinestesia/contenido/fotos/';

  //id de las canciones que recogo
  idCanciones: any;


  constructor(private usuariosServicio: UsuariosService) { }

  ngOnInit(): void {
    this.recuperarUsuario()
  }

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
      this.cambiarIdATamanno(datos[4])
      this.cambiarIdAColorFondo(datos[5])
      this.cambiarIdAColorLetra(datos[6])

      //metodos playlist
      this.recuperarPlaylist()
    })
  }

  recuperarPlaylist() {
    this.usuariosServicio.recuperarPlaylist(this.idPlaylist).subscribe((datos: any) => {

      this.playList.Id_playlist = datos[0]
      this.playList.Nombre = datos[1]
      this.playList.foto = datos[2]
      this.playList.Id_usuario = datos[3]
      this.idCancionYPlayList.idPlaylist = datos[0]
      this.recuperarCanionesPlaylistUnica()

    })
  }


  recuperarCanionesPlaylistUnica() {
    this.usuariosServicio.recuperarCanionesPlaylist(this.idPlaylist).subscribe((datos: any) => {
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
        this.recuperarCanionesPlaylistUnica()

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
          'Tu cancion ha sido borrado con exito!',
          'success'
        )
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



  //personalizacion

  cambiarIdAColorFondo(idColor: any) {
    for (let i = 0; i < this.coloresSelecionables.length; i++) {
      if (this.coloresSelecionables[i].id == idColor) {
        this.colorFondo = this.coloresSelecionables[i].color
        this.colorBotonLetra = this.colorBotonFondo
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
