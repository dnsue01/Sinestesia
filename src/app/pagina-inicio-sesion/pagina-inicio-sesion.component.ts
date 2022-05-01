import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagina-inicio-sesion',
  templateUrl: './pagina-inicio-sesion.component.html',
  styleUrls: ['./pagina-inicio-sesion.component.scss']
})
export class PaginaInicioSesionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  usuario = {
    email: "",
    contrasenna: "",
  }


  iniciarSesion() {

    if (this.usuario.email != "") {

      if (this.usuario.contrasenna != "") {

        console.log("entro");
        
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

}
