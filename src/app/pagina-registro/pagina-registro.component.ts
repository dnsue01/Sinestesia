import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-pagina-registro',
  templateUrl: './pagina-registro.component.html',
  styleUrls: ['./pagina-registro.component.scss']
})
export class PaginaRegistroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  usuario = {
    email: "",
    nombre: "",
    contrasenna: "",
    contrasennaConfirmacion: "",
    tipo: 0
  }



  Registrarse() {
    //comprobar el email

    if (this.validarEmail(this.usuario.email)) {

      if (this.validarNombre(this.usuario.nombre)) {







        //comprobar las contaseñas

        //Comprobacion de que no estan vaciass
        if ((this.usuario.contrasenna != "")) {

          //comprobacion de que cumplen con la expresion regular
          if (this.comprobarContrasenna(this.usuario.contrasenna)) {

            //Si las dos contraseñas coinciden lo mando al php para comprobar que
            // no esta registrido ya si no lo esta el registro es exitoso
            if (this.usuario.contrasenna == this.usuario.contrasennaConfirmacion) {

              //comprobar que el que esta seleccionada una
              var tipoUsuario = document.getElementsByName('tipoUsuario');

              //   for (let i = 0; i < tipoUsuario.length; i++) {
              //  if (tipoUsuario[i].checked) {
              //    var memory = tipoUsuario[i].checked;
              //       alert(tipoUsuario);
              //   }

              console.log("entraste");
            }
            else {
              if (this.usuario.contrasennaConfirmacion == "") {

                //campo vacio de la confirmacion de la contraseña
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: "La  confirmacion de la contraseña no puede estar vacia",
                })

              } else {
                //las contraseñas no son iguales

                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: "Las contraseñas no son iguales ",
                })
              }

            }
          } else {
            //no cumple la expresion regular
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "La contraseña no cumple con nuestras normas por lo menos tiene que tener 5 caracteres ,una letra mayuscula , una minuscula y un signo especial. Un ejemplo: Sinestesia1!",
            })

          }
        } else {
          //la contraseña no cumple la expresion regular 
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La contraseña no puede estar vacia',
          })



        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El nombre de usuario tiene que ser entre 4 y 16 caracteres',
        })
      }


    } else {
      //el correo no cumple la expresion regular 
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El email tiene que tener por lo menos un @ y . Un ejemplo:  sinestesia@gmail.es',
      })

    }




  }

  validarNombre(nombre: any) {
    //Cualquier string de entre 4 y 16
    var re = /.{4,16}$/;
    return re.test(nombre);
  }

  validarEmail(email: any) {
    //Cualquier string un @ cualquier string un . y finalmente cualquier string
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  comprobarContrasenna(contrasenna: any) {
    //Contraseña de minimo 5 caracteres un simbolo especial y debe incluir mayusculas y minusculas
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    return re.test(contrasenna);
  }





}
