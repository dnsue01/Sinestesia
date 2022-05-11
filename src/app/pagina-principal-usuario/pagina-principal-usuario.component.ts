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

  @Input() nombre = "";

  //le paso la cancion al padre





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

  //albumes cuando es artista
  albumesArtista: any;
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
  cancionSeleccionada: boolean = false;

  //saber si es explicita
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

      } else {
        //metodos artista
        this.recogerCancionesArtista();
        this.recogerAlbumesArtista();
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

  ////////////////////////////////////////////////////////

  //metodos artista


  recogerCancionesArtista() {
    this.usuariosServicio.recogerCancionesArtista(this.usuario.id).subscribe((datos: any) => {
      this.CancionesArtista = datos;

    })
  }

  recogerAlbumesArtista() {
    this.usuariosServicio.recogerAlbumsArtista(this.usuario.id).subscribe((datos: any) => {
      this.albumesArtista = datos;
      console.log(this.albumesArtista);

    })
  }

  sacarCancion(cancion: any) {
    this.cancionRepro = cancion;
    this.cancionSeleccionada = true;

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
          'Tu canncion esta a salvo',
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
    this.usuariosServicio.borrarCancion(idCancion).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        Swal.fire(
          'Borrado!',
          'Tu cancion ha sido borrada con exito!',
          'success'
        )
        this.recogerCancionesArtista();
      }

    })
  }
  borrarAlbum(idAlbum: any) {
    this.usuariosServicio.borrarAlbum(idAlbum).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        Swal.fire(
          'Borrado!',
          'Tu album ha sido borrado con exito!',
          'success'
        )
        this.recogerAlbumesArtista();
      }

    })
  }

}
