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
    correo: "",
    nombre: "",
    contrasennaEncrip: "",
    contrasennaConfirmacion: "",
    contrasennaConfirmacion1: "",
    tamanno_letra: "",
    color_fondo: "",
    color_fuente: "",
  }

  colores: any = listadeColores;
  coloresSelecionables: any;
  
  colorLetra: string = "";
  colorFondo: string = "";

  colorBotonFondo:string="#198754";
  colorBotonLetra:string="white";

  iguales: boolean = false;

  constructor(private usuariosServicio: UsuariosService) { }

  ngOnInit(): void {
    this.recuperarUsuario();
    this.coloresSelecionables = this.colores.colors

  }

  recuperarUsuario() {
    this.usuariosServicio.recuperarUsuario(this.nombre).subscribe((datos: any) => {


      this.usuario.correo = datos[1];
      this.usuario.nombre = datos[2];
      this.usuario.contrasennaEncrip = datos[3];
      this.usuario.tamanno_letra = datos[4];
      this.usuario.color_fondo = datos[5];
      this.usuario.color_fuente = datos[6];
   

    });
  }

  Saludar() {
    console.log("hola");

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
        if (this.colorFondo == "blue" && this.colorLetra == "") {
          this.colorLetra = "white"
          this.colorBotonFondo="white"

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

}
