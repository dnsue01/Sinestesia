import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//importar el servicio
import { UsuariosService } from '../usuarios.service';
@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.scss']
})
export class PanelControlComponent implements OnInit {

  constructor(private route: ActivatedRoute, private usuariosServicio: UsuariosService) { }
  //parametros que recivo del inicio de sesion
  id = this.route.snapshot.params["id"];

  //tipo de usuario
  tipo: any;
  //nombre usuario
  nombre: any;
  //usuarios
  usarios: any;
  //canciones
  canciones:any;
  //url de canciones
  urlCanciones = 'http://localhost/sinestesia/contenido/canciones/';
  
  ngOnInit(): void {
    this.RecuperartipoAdmin()
  }

  RecuperartipoAdmin() {
    this.usuariosServicio.recuperarTipoAdmin(this.id).subscribe((datos: any) => {
      this.tipo = datos["mensaje"]
      //comprobar que tipo de usuario es 
      switch (this.tipo) {
        case "TOTAL":
          console.log("todo");
          this.recuperarTodosUsuarios();
          this.recuperarCanciones();
          break;
        case "MUSIC":
          console.log("musica");
          this.recuperarCanciones();
          break;
        case "USUAR":
          console.log("USUAR");
          this.recuperarTodosUsuarios();
          break;

      }
      this.reuperarNombreAdmin();
    })
  }

  reuperarNombreAdmin() {
    this.usuariosServicio.recuperarNombreAdmin(this.id).subscribe((datos: any) => {
      this.nombre = datos["mensaje"]
    })
  }
  recuperarTodosUsuarios() {
    this.usuariosServicio.recuperarTodosUsuarios().subscribe((datos: any) => {
      this.usarios = datos;
    })
  }
  recuperarCanciones() {
    this.usuariosServicio.recuperarTodasCanciones().subscribe((datos: any) => {
      this.canciones = datos;
    })
  }


}
