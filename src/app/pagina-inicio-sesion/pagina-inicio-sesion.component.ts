import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-pagina-inicio-sesion',
  templateUrl: './pagina-inicio-sesion.component.html',
  styleUrls: ['./pagina-inicio-sesion.component.scss']
})
export class PaginaInicioSesionComponent implements OnInit {

  constructor(private usuariosServicio: UsuariosService) { }

  ngOnInit(): void {
  }

  usuario = {
    correo: "",
    contrasenna: "",
  }


  iniciarSesion() {

    if (this.usuario.correo != "") {

      if (this.usuario.contrasenna != "") {


        this.comprobacion();


      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "El campo de la contraseña  esta vacio",
        })
      }



    } else {
      //campo de correo vacio
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "El campo del correo esta vacio",
      })
    }


  }

  comprobacion() {
    this.usuariosServicio.comprobarUsuarioInicio(this.usuario).subscribe((datos: any) => {
      if (datos) {
        console.log("existes");

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No hay una cuenta con este nombre o correo porfavor prueba otra vez',
        })
      }

    });
  }

}
