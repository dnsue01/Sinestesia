import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
//servicio
import { UsuariosService } from '../usuarios.service';
import Swal from 'sweetalert2';
//imporar los json
import listadeColores from 'src/assets/json/colores.json';
import listadeTamanno from 'src/assets/json/tamannoLetra.json';

//lista de paises
import listadePaises from 'src/assets/json/flags.json';
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
  //recoger el nombre
  @Input() nombre = "";

  //pasar el audio de la cancion la barra
  @Output() pasarCancion: EventEmitter<any> = new EventEmitter()
  //pasar la caratula de la cancion la barra
  @Output() pasarCaratulaCancion: EventEmitter<any> = new EventEmitter()
  //pasar el titulo de la cancion la barra
  @Output() pasarTituloCancion: EventEmitter<any> = new EventEmitter()

  //pasar el nombre del Artista  la barra
  @Output() pasarNombreArtista: EventEmitter<any> = new EventEmitter()

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
  //parametros para pasar al padre
  cancionTitulo = "";
  cancionCaratula = "";
  //cancion a reproducir
  cancionRepro: any;
  //artista 
  artista: any;

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

  //paises array
  paises: any = listadePaises;

  paisesBd:any = []
  //Tamanno de json
  tamanno: any = listadeTamanno;
  tamannoSeleccionable: any;

  //url donde estan las fotos del servidor
  urlFotos = 'http://localhost/sinestesia/contenido/fotos/';

  busqueda: string = "";

  buscado: boolean = false;

  //mayor de edad
  mayor: boolean = true
  //arrays de objetos
  albumes: any;
  cancionesNuevas: any;
  artistasNuevos: any = [];
  playlists: any = [];
  //id de cancion y playlist para mandar a la bd
  idCancionYPlayList = {
    idcancion: "",
    idPlaylist: ""
  }
  //cancion seleccionada para añadir
  seleccionado: boolean = false

  //lista paises


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
      //comprobarEdad
      this.comprobarEdad()
      //recoger sin darle a buscar
      this.recuperarNuevasCanciones()
      this.recuperarNuevosArtistas()
      this.recogerPlayListUsuario()
      this.recogerPaises()
    });
  }
  //compruebo en la bd si el usuario es mayor de edad
  comprobarEdad() {
    this.usuariosServicio.comprobarEdad(this.usuario.id).subscribe((datos: any) => {
      if (datos["mensaje"]) {
        this.mayor = false
      }
    })
  }

    //compruebo en la bd si el usuario es mayor de edad
    recogerPaises() {
      this.usuariosServicio.recogerPaises().subscribe((datos: any) => {
      for (let i = 0; i < datos.length; i++) {
        const pais = datos[i][0];
        this.paisesBd.push(pais)
        
      }
      
      })
    }

  //buscar

  buscar() {
    this.buscado = true
  }

  //recupererar las 4 primeras canciones


  recuperarNuevasCanciones() {
    this.usuariosServicio.recuperarNuevasCanciones().subscribe((datos: any) => {
      this.cancionesNuevas = datos;

    })
  }
  recuperarNuevosArtistas() {
    this.usuariosServicio.recuperarNuevosArtistas().subscribe((datos: any) => {
      for (let i = 0; i < datos.length; i++) {
        //paso la foto y el id para para representar los dos
        const idArtista = datos[i][0];
        const fotoArtista = datos[i][1];
        this.recogerArtista(idArtista, fotoArtista);
      }
    })
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
    if (this.idCancionYPlayList.idPlaylist != "") {

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
              this.seleccionado = false;

            } else if (
              //si le da a cancelar
              result.dismiss === Swal.DismissReason.cancel
            ) {
              this.seleccionado = false;
              Swal.fire(
                'Cancelado!',
                'Tu cancion no se ha añadido',
                'info'
              )
            }
          })

        } else {
          this.insertarCancionPlaylist()
          this.seleccionado = false;
        }
      })
    } else {
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

  //passar id de artista y recoger nombre

  recogerArtista(idArtista: any, fotoArtista: any) {

    this.usuariosServicio.recogerArtista(idArtista).subscribe((datos: any) => {
      datos.push(fotoArtista)
      this.artistasNuevos.push(datos)

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

  //nobre del artista
  sacarNombreArtista(artista: any) {
    this.artista = artista;
    //pasar nombre al padre
    this.pasarNombreArtista.emit(this.artista)


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
