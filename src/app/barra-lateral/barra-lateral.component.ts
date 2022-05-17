import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-barra-lateral',
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.scss']
})
export class BarraLateralComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private usuariosServicio: UsuariosService,private router:Router) { }
  //parametros que paso a los hijos
  nombre = this.route.snapshot.params["nombre"];
  //hago un string opcion para comprobar que opcion elige
  opcion: string = "";
  //el usuario es estandar
  estandar: boolean = true;
  
  //cancion y album
  albumYCancion:boolean = false;

  //ha seleccionado un album
  albumSelccionado:boolean = false;

  //cancion
  cancionRepro:any;
  carutlaCancion:any;
  tituloCancion:string = "";
  hayCancion:boolean = false;

  //album
  idAlbum:string="";

  //playlist
  idPlaylist:string="";
  
  //recivo si hay una cancion y un album
  crearBotonAnnadir(datos:any){
    this.albumYCancion = datos
    
  }
  //url donde estan las fotos del servidor
   urlFotos = 'http://localhost/sinestesia/contenido/fotos/';
  //url donde estan las canciones del servidor
   urlCanciones = 'http://localhost/sinestesia/contenido/canciones/';

  //pasar Audio
  pasarCancion(datos:any){
    this.cancionRepro = datos
    this.hayCancion = true;
  }
//pasar imagen
  pasarCaratulaCancion(datos:any){
    this.carutlaCancion = datos
  }
//pasar nombre
  pasarTituloCancion(datos:any){
    this.tituloCancion = datos
  }
//pasar id de album
  pasarIdAlbum(datos:any){
   this.idAlbum = datos;
   //esto lo hago para que entre directamente a la ruta
   this.opcion = "detalleAlbum";
  }

//pasar id de playList
pasarIdPlaylist(datos:any){
  this.idPlaylist = datos;
  //esto lo hago para que entre directamente a la ruta
  this.opcion = "detallePlaylist";
 }

  usuario = {
    id: "",
    correo: "",
    nombre: "",
    contrasennaEncrip: "",
    tamanno_letra: "",
    color_fondo: "",
    color_fuente: "",
  }


  ngOnInit(): void {

    this.recuperarUsuario();

  }
  //seleccionar opciones
  Inicio() {
    this.opcion = "inicio"
  }
  Ajustes() {
    this.opcion = "ajustes"
  }

  SubirCancion() {
    this.opcion = "subirCancion"
  }
  CrearAlbum(){
    this.opcion = "CrearAlbum"
}

annadirCancionesAlbum(){
  this.opcion = "annadirCancionesAlbum"
}
crearPlayList(){
  this.opcion = "crearPlayList"
}
listaPlayList(){
  this.opcion = "listaPlayList"
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
      this.recuperarTipoUsuario();
    });
  }

  //comprobar que tipo de usuario es
  recuperarTipoUsuario() {
    this.usuariosServicio.RecuperarTipoUsuario(this.usuario.id).subscribe((datos: any) => {
      this.estandar = datos["mensaje"]

    });
  }

}
