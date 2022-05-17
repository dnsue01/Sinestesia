import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

//servicio
import { UsuariosService } from '../usuarios.service';

//imporar los json
import listadeColores from 'src/assets/json/colores.json';
import listadeTamanno from 'src/assets/json/tamannoLetra.json';

//alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-play-list',
  templateUrl: './lista-play-list.component.html',
  styleUrls: ['./lista-play-list.component.scss']

})
export class ListaPlayListComponent implements OnInit {

  //pasar el id de la playlist para acceder al otro componente
  @Output() pasarIdPlaylist: EventEmitter<any> = new EventEmitter()

  //recoger el nombre
  @Input() nombre = "";

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


  //playlisit
  playList = {
    Id_playlist: "",
    Nombre: "",
    foto: "",
    Id_usuario: ""
  }
  //todas las paylist del usuario
  playlists: any;
  //id de la playlist
  idPlaylist: any;

  //url donde estan las fotos del servidor
  urlFotos = 'http://localhost/sinestesia/contenido/fotos/';

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
      this.cambiarIdATamanno(datos[4]);
      this.cambiarIdAColorFondo(datos[5]);
      this.cambiarIdAColorLetra(datos[6]);
      //playlists
      this.recogerPlayListUsuario();

    })
  }

  //detalle de la playlist

  detallePlayList(idPlaylist: any) {

    this.idPlaylist = idPlaylist;
    this.pasarIdPlaylist.emit(this.idPlaylist)
  }


  borrarPlay(idPlaylist: any, nombrePlaylist: any) {

    Swal.fire({

      title: '¿Estas seguro?',
      text: "No se puede recuperar una vez borrada!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, quiero borrarla !',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        //condicional para que no pueda borrar la playlist principal
        if (nombrePlaylist == "Canciones que te gustan") {

          Swal.fire(
            'Cuidado!',
            'Esta playlist no se puede borrar!',
            'warning'
          )
        } else {
          //metodo de borar
          this.borrarPlaylist(idPlaylist)
        }


      } else if (
        //si le da a cancelar
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado!',
          'La playlist esta a salvo',
          'info'
        )
      }
    })


  }

  borrarPlaylist(id: any) {
    this.usuariosServicio.borrarPlaylist(id).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        Swal.fire(
          'Borrada!',
          'La playlist ha sido borrado con exito!',
          'success'
        )
        this.recogerPlayListUsuario();
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
