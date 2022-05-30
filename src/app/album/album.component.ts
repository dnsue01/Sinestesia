import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';



//servicio
import { UsuariosService } from '../usuarios.service';

//imporar los json
import listadeColores from 'src/assets/json/colores.json';
import listadeTamanno from 'src/assets/json/tamannoLetra.json';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  //recoger el i del album
  @Input() idAlbum = "";

  //recoger el nombre
  @Input() nombre = "";
 //pasar el audio de la cancion la barra
 @Output() pasarCancion:EventEmitter<any>= new EventEmitter()
 //pasar la caratula de la cancion la barra
 @Output() pasarCaratulaCancion:EventEmitter<any>= new EventEmitter()
  //pasar el titulo de la cancion la barra
 @Output() pasarTituloCancion:EventEmitter<any>= new EventEmitter()

  constructor( private usuariosServicio: UsuariosService) { }

  ngOnInit(): void {
    //recuperar usuario
    this.recuperarUsuario();
    //recueprar Album
    this.recuperarAlbum();
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
  //album
  album = {
    id: "",
    Nombre: "",
    foto_album: "",
    Id_usuario: ""
  }

  albumYcancion={
    idalbum:"",
    idCancion:""
  }

  estandar:boolean = false;
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
  CancionesAlbum: any = [];
  hayCanciones:boolean= false;

  //url donde estan las fotos del servidor
  urlFotos = 'http://localhost/sinestesia/contenido/fotos/';

  //id de las canciones que recogo
  idCanciones: any;
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
      this.cambiarIdATamanno(datos[4])
      this.cambiarIdAColorFondo(datos[5])
      this.cambiarIdAColorLetra(datos[6])
      this.recuperarTipoUsuario();
    })
  }

  //comprobar que tipo de usuario es
  recuperarTipoUsuario() {
    this.usuariosServicio.RecuperarTipoUsuario(this.usuario.id).subscribe((datos: any) => {
      this.estandar = datos["mensaje"]
    });
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
  //recuperar album
  recuperarAlbum() {
    this.usuariosServicio.recuperarAlbum(this.idAlbum).subscribe((datos: any) => {
      this.album.id = datos[0]
      this.album.Nombre = datos[1]
      this.album.foto_album = datos[2]
      this.album.Id_usuario = datos[3]
      //recuperar canciones de album
      this.recuperarCancionesAlbum();

    })
  }

  //recuperar canciones album
  recuperarCancionesAlbum() {
    this.usuariosServicio.recuperarCancionesAlbum(this.idAlbum).subscribe((datos: any) => {
      this.idCanciones = datos;
      if(this.idCanciones.length>0){
        this.hayCanciones=true;
        this.recuperarCancion()
      }
  
    })
  }

  recuperarCancion() {
    for (let i = 0; i < this.idCanciones.length; i++) {
      //separo cada id en una variable
      const idCancion = this.idCanciones[i][0];
      //hago una consulta con ese id a la bd para que me devuelva cada cancion
      this.usuariosServicio.recuperarCancionAlbum(idCancion).subscribe((datos: any) => {
        //Añado individualmete cada cancion a el array de todas las cancioness
        this.CancionesAlbum.push(datos)

      })

    }
  }

  
  borrarCan(idCancion: any) {

    Swal.fire({

      title: '¿Estas seguro?',
      text: "Vas a borrar esta cancion de del album!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, quiero borrarla !',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.albumYcancion.idCancion = idCancion;
        this.albumYcancion.idalbum = this.idAlbum
        //metodo de borar
        this.borrarCancion(this.albumYcancion)
        this.CancionesAlbum = []
        this.hayCanciones = false;
        this.recuperarAlbum()
        

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
  //borrar cancion del album de la bd
  borrarCancion(idCancion: any) {
    this.usuariosServicio.borrarCancionAlbum(idCancion).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        Swal.fire(
          'Borrado!',
          'Tu cancion ha sido borrada con exito!',
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
  pasarCaratula(cancion: any){
  this.cancionCaratula = cancion;
  //pasar caratula
  this.pasarCaratulaCancion.emit(this.cancionCaratula)
  }






}
