import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
//servicio
import { UsuariosService } from '../usuarios.service';

//imporar los json
import listadeColores from 'src/assets/json/colores.json';
import listadeTamanno from 'src/assets/json/tamannoLetra.json';

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

  busqueda: string = "";

  buscado: boolean = false;

  //arrays de objetos
  albumes: any;
  cancionesNuevas: any;
  artistasNuevos: any = [];
  paises: any;

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
      //recoger sin darle a buscar
      this.recuperarNuevasCanciones()
      this.recuperarNuevosArtistas()
    });
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
        this.recogerArtista(idArtista,fotoArtista);
      }
    })
  }

  //passar id de artista y recoger nombre

  recogerArtista(idArtista:any,fotoArtista:any) {
   
      this.usuariosServicio.recogerArtista(idArtista).subscribe((datos: any) => {
        datos.push(fotoArtista)
        this.artistasNuevos.push(datos)
        console.log(this.artistasNuevos);
        
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
