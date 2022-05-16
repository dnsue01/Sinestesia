import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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
  hayUsuarios: boolean = false;

  cancion = {
    idCancion: "",
    idAdmin: ""

  }
  //canciones
  canciones: any;
  hayCanciones: boolean = false;
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
        case "MUSICA":
          this.recuperarCanciones();
          break;
        case "USUAR":
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
      if (this.usarios.length > 0) {
        this.hayUsuarios = true;
      }
    })
  }
  //recuperar canciones no autorizadas
  recuperarCanciones() {
    this.usuariosServicio.recuperarTodasCanciones().subscribe((datos: any) => {
      this.canciones = datos;
      if (this.canciones.length > 0) {
        this.hayCanciones = true;
      }
    })
  }

  autorizar(idCancion: any) {
    this.cancion.idCancion = idCancion
    this.cancion.idAdmin = this.id

    Swal.fire({

      title: '¿Estas seguro?',
      text: "vas a autorizar esta  cancion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, quiero autorizarla!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        //autorizar
        this.AutorizarCancion();
        

      } else if (
        //si le da a cancelar
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado!',
          'La cancion no ha sido autorizada',
          'info'
        )
      }
    })
  }

  AutorizarCancion() {
    this.usuariosServicio.AutorizarCancion(this.cancion).subscribe((datos: any) => {
    
      if (datos['resultado']=='OK') {
        Swal.fire({
          icon: 'success',
          title: 'cancion autorizada!',
          showConfirmButton: false,
          timer: 700
        })
      }
    })
  }

}
