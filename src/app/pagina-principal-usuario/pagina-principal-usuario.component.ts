import { Component, OnInit, Input } from '@angular/core';
//importar el servicio
import { UsuariosService } from '../usuarios.service';
//imporar los json
import listadeColores from 'src/assets/json/colores.json';
import listadeTamanno from 'src/assets/json/tamannoLetra.json';

@Component({
  selector: 'app-pagina-principal-usuario',
  templateUrl: './pagina-principal-usuario.component.html',
  styleUrls: ['./pagina-principal-usuario.component.scss']
})
export class PaginaPrincipalUsuarioComponent implements OnInit {

  @Input() nombre = "";

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
  //cancion
  cancion = {
    Id_cancion: "",
    Nombre: "",
    Url_cancion: "",
    Url_caratula: "",
    Id_artista: "",
    Id_album: "",
    Id_adminAu: "",
    explicita: "",
    Autorizada: ""
  }

  //canciones cuando es artista
  CancionesArtista:any;

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
      //metodos artista
      this.recogerCancionesArtista();


    });
  }

  //comprobar que tipo de usuario es
  recuperarTipoUsuario() {
    this.usuariosServicio.RecuperarTipoUsuario(this.usuario.id).subscribe((datos: any) => {
      this.estandar = datos["mensaje"]

    });
  }
  //recoger la foto de la base de datos
  recuperarFoto() {
    this.usuariosServicio.RecuperarFoto(this.usuario.id).subscribe((datos: any) => {
      console.log(datos['resultado']);
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
    console.log(this.CancionesArtista);
    
  })
}

}
