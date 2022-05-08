import { Component, Input, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import listadeColores from 'src/assets/json/colores.json';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit {
  @Input() nombre = "";

  usuario = {
    id:"",
    correo: "",
    nombre: "",
    contrasennaEncrip: "",
    contrasennaAntigua: "",
    contrasennaConfirmacion: "",
    contrasennaConfirmacion1: "",
    tamanno_letra: "",
    color_fondo: "",
    color_fuente: "",
  }

  //Colores de json
  colores: any = listadeColores;
  coloresSelecionables: any;
  
  //colores de la bd
  colorLetra: string = this.usuario.color_fuente;
  colorFondo: string = this.usuario.color_fondo;

  //colores defecto del boton
  colorBotonFondo:string="#198754";
  colorBotonLetra:string="white";

  //comprobacion de colores
  iguales: boolean = false;

  constructor(private usuariosServicio: UsuariosService) { }

  ngOnInit(): void {
    this.recuperarUsuario();
    this.coloresSelecionables = this.colores.colors
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
   

    });
  }

 

  seleccionarLetra(e: any) {
    var idColor: any = e.target.value
    this.cambiarIdAColorLetra(idColor);
    this.usuario.color_fuente = idColor

  }

  seleccionarFondo(e: any) {
    var idColor: any = e.target.value
    this.cambiarIdAColorFondo(idColor);
    this.usuario.color_fondo = idColor

  }

  recogerColorFondoBd(colorId: any) {
    colorId = this.usuario.color_fondo
    this.cambiarIdAColorFondo(colorId)

  }
  recogerColorLetraBd(colorId: any) {
    colorId = this.usuario.color_fuente
    this.cambiarIdAColorLetra(colorId)

  }

  cambiarIdAColorLetra(idColor: any) {

    for (let i = 0; i < this.coloresSelecionables.length; i++) {

      if (this.coloresSelecionables[i].id == idColor) {

        this.colorLetra = this.coloresSelecionables[i].color
        this.comprobarColores()
        this.colorBotonFondo=this.colorLetra
        this.colorBotonLetra=this.colorFondo
        if (this.iguales) {
          this.colorFondo = ""
          this.colorLetra = ""
          this.colorBotonFondo="#198754";
          this.colorBotonLetra="white";
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'no puedes tener el mismo color para las dos cosas',
          })

          this.iguales=false

        } if (this.colorFondo == "black" && this.colorLetra == "") {
          this.colorLetra = "white"
          this.colorBotonFondo="white";
          this.colorBotonLetra="black";
        }
        if (this.colorFondo == "blue" && this.colorLetra == "") {
          this.colorLetra = "white"
          this.colorBotonFondo="white";
          this.colorBotonLetra="blue";
        }
        if(this.colorLetra=="blue" && this.colorFondo==""){
          this.colorBotonLetra="white"

        }
        
        
      }
    }
  }



  cambiarIdAColorFondo(idColor: any) {

    for (let i = 0; i < this.coloresSelecionables.length; i++) {
      

  
      if (this.coloresSelecionables[i].id == idColor) {
        this.colorFondo = this.coloresSelecionables[i].color

        this.comprobarColores()
        this.colorBotonFondo=this.colorLetra
        this.colorBotonLetra=this.colorFondo
        if (this.colorFondo == "black" && this.colorLetra == "") {
          this.colorLetra = "white"
          this.colorBotonFondo="white"
          this.colorBotonLetra="black"
        }
        if (this.colorFondo == "white" && this.colorLetra == "") {
          this.colorLetra = "black"
          this.colorBotonFondo="black"
          this.colorBotonLetra="white"
        }
        if (this.colorFondo == "blue" && this.colorLetra == "") {
          this.colorLetra = "white"
          this.colorBotonFondo="white"
        }
        if(this.colorFondo == "red" && this.colorLetra == "" ){
          this.colorBotonFondo="black"
          this.colorBotonLetra="red"
        }

        if(this.colorFondo == "green" && this.colorLetra == "" ){
          this.colorBotonFondo="black"
          this.colorBotonLetra="green"
        }

        if(this.colorFondo == "yellow" && this.colorLetra == "" ){
          this.colorBotonFondo="black"
          this.colorBotonLetra="yellow"
        }

  

      }

      if (this.iguales) {
        this.colorFondo = ""
        this.colorLetra = ""
        this.colorBotonFondo="#198754";
        this.colorBotonLetra="white";

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'no puedes tener el mismo color para las dos cosas',
        })
        this.iguales=false

      }
    }
  }

  comprobarColores() {
    console.log(this.colorFondo + " " + this.colorLetra);

    if (this.colorFondo == this.colorLetra) {

      this.iguales = true

    }
  }

  cambiarContrasenna(){


    
    if(this.usuario.contrasennaAntigua!=""){

     if(this.usuario.contrasennaConfirmacion!=""){

    
      if(this.usuario.contrasennaConfirmacion1!=""){
        
        if(this.usuario.contrasennaConfirmacion == this.usuario.contrasennaConfirmacion1){

          
          if(this.comprobarContrasenna(this.usuario.contrasennaConfirmacion)){

        
            this.comprobarContrasennaBD();

            
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'La nueva contraseña no cumple nuestras reglas',
            })
          }
          
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los campos de la confirmación de la nueva contraseña no son iguales',
          })
        }
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El campo de la confirmación de la nueva contraseña esta vacio',
        })
      }
     }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo de la nueva contraseña esta vacio',
      })
     }
      
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo de la contraseña esta vacio',
      })
    }
  }


  comprobarContrasenna(contrasenna: any) {
    //Contraseña de minimo 5 caracteres un simbolo especial y debe incluir mayusculas y minusculas
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    return re.test(contrasenna);
  }


  comprobarContrasennaBD(){

    this.usuariosServicio.comprobarContrasennaBD(this.usuario).subscribe((datos: any) => {
    
      if(datos){

        this.ActualizarContrasenna();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La contraseña no concuerda',
        })
      }
    
    });

  }


  ActualizarContrasenna(){
    this.usuariosServicio.ActualizarContrasenna(this.usuario).subscribe((datos: any) => {
    
      if (datos['resultado']=='OK') {
        Swal.fire({

          icon: 'success',
          title: 'Contraseña cambiada correctamente',
          showConfirmButton: false,
          timer: 700
        })
     
      }
    
    })
    
  }

  
}
