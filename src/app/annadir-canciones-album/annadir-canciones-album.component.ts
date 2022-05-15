import { Component, Input, OnInit } from '@angular/core';

//alertas
import Swal from 'sweetalert2';

//servicio
import { UsuariosService } from '../usuarios.service';

//imporar los json
import listadeColores from 'src/assets/json/colores.json';
import listadeTamanno from 'src/assets/json/tamannoLetra.json';

@Component({
  selector: 'app-annadir-canciones-album',
  templateUrl: './annadir-canciones-album.component.html',
  styleUrls: ['./annadir-canciones-album.component.scss']
})
export class AnnadirCancionesAlbumComponent implements OnInit {


  //recojo del padre
  @Input() nombre = "";

  albumYCancion = {
    idAlbum: "",
    idCancion: ""
  }


  idAlbum: string = "";
  idCancion: string = "";


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

  //alumbes
  albumesArtista: any;
  //canciones
  CancionesArtista: any;

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
      this.cambiarIdATamanno(datos[4])
      this.cambiarIdAColorFondo(datos[5])
      this.cambiarIdAColorLetra(datos[6])
      //recoger albums y canciones
      this.recogerAlbumesArtista();
      this.recogerCancionesArtista();

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

  //recoger albumes y canciones

  recogerAlbumesArtista() {
    this.usuariosServicio.recogerAlbumsArtista(this.usuario.id).subscribe((datos: any) => {
      this.albumesArtista = datos;

    })
  }

  recogerCancionesArtista() {
    this.usuariosServicio.recogerCancionesArtista(this.usuario.id).subscribe((datos: any) => {
      this.CancionesArtista = datos;

    })
  }

  seleccionarAlbum(e: any) {
    this.idAlbum = e.target.value
  }
  seleccionarCancion(e: any) {
    this.idCancion = e.target.value
  }

  //añadir cancion a album

  annadirCancionAlbum() {
    //comprobaciones de campos de no vacioss
    if (this.idAlbum != "") {

      if (this.idCancion != "") {

        //comprobacion en la bd
        this.albumYCancion.idAlbum = this.idAlbum
        this.albumYCancion.idCancion= this.idCancion
        //comprobar si esta en el album
        this.ComprobarCancionAlbum()

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debes de seleccionar una cancion',
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes de seleccionar un album ',
      })
    }
  }
  //comprobar que la cancion ya esta en el album

  ComprobarCancionAlbum() {

    this.usuariosServicio.ComprobarCancionAlbum(this.albumYCancion).subscribe((datos: any) => {
      console.log(datos["mensaje"]);
      
      if (!datos["mensaje"]) {
        this.insertarCancionAlbum()
        
      } else {

        Swal.fire({

          title: '¿Estas seguro?',
          text: "Esta cancion ya esta en este album!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, quiero añadirla!',
          cancelButtonText: 'No, cancelar!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
    
            //metodo de insertar
           this.insertarCancionAlbum()
    
          } else if (
            //si le da a cancelar
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire(
              'Cancelado!',
              'Tu cancion no se ha añadido',
              'info'
            )
          }
        })
    

      }
    })
  }

  //insertar Album base de datos
  insertarCancionAlbum(){
    this.usuariosServicio.insertarCancionAlbum(this.albumYCancion).subscribe((datos: any) => {
       if (datos['resultado']=='OK') {
         Swal.fire({
           icon: 'success',
           title: 'cancion añadida!',
           showConfirmButton: false,
           timer: 700
         })
       }

 })
}



}
