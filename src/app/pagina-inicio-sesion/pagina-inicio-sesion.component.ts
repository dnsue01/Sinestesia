import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-pagina-inicio-sesion',
  templateUrl: './pagina-inicio-sesion.component.html',
  styleUrls: ['./pagina-inicio-sesion.component.scss']
})
export class PaginaInicioSesionComponent implements OnInit {

  constructor(private usuariosServicio: UsuariosService,private router: Router) { }

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
       this.inicioSesion();

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No hay ninguna cuenta con este nombre o correo porfavor prueba otra vez',
        })
      }

    });
  }

  inicioSesion() {
    this.usuariosServicio.iniciarSesion(this.usuario).subscribe((datos: any) => {
      if (datos) {
     
        Swal.fire({

          icon: 'success',
          title: 'Inicio correcto',
          showConfirmButton: false,
          timer: 700
        })
        
        this.recuperarNombre();

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Parece que la contraseña esta mal ,intentalo otra vez...',
        })
      }

    });
  }

  recuperarNombre(){
    this.usuariosServicio.recuperarNombre(this.usuario).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.entrar(datos['mensaje']);
      }
     
     
    });
  }
  


  entrar(nombre:any){
    this.router.navigate(["/principal",nombre]); 
  }

}
