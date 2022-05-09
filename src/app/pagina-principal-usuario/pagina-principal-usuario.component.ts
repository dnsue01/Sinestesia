import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../usuarios.service';

import listadeColores from 'src/assets/json/colores.json';
import listadeTamanno from 'src/assets/json/tamannoLetra.json';

@Component({
  selector: 'app-pagina-principal-usuario',
  templateUrl: './pagina-principal-usuario.component.html',
  styleUrls: ['./pagina-principal-usuario.component.scss']
})
export class PaginaPrincipalUsuarioComponent implements OnInit {

  @Input() nombre = "";
  estandar: boolean = true;
 
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
   tamannoLetra:string = this.usuario.tamanno_letra;
 
  //paso el id del usuario y la foto
  idYFoto = {
    id: "",
    nombre: "",
    extension: ""
  }



  urlFotos='http://localhost/sinestesia/contenido/fotos/';

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
      this.recuperarTipoUsuario();
      this.recuperarFoto();
 

    });
  }

  //comprobar que tipo de usuario es
  recuperarTipoUsuario() {
    this.usuariosServicio.RecuperarTipoUsuario(this.usuario.id).subscribe((datos: any) => {
      this.estandar = datos["mensaje"]

    });
  }
  recuperarFoto() {
    this.usuariosServicio.RecuperarFoto(this.usuario.id).subscribe((datos: any) => {
      console.log(datos['resultado']);
      this.idYFoto.extension = datos['mensaje']
    })


  }

  
}
