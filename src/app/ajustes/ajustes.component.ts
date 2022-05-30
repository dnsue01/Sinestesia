import { Component, Input, OnInit } from '@angular/core';
//importar el servicio
import { UsuariosService } from '../usuarios.service';
//importar los json
import listadeColores from 'src/assets/json/colores.json';
import listadeTamanno from 'src/assets/json/tamannoLetra.json';
//alertas
import Swal from 'sweetalert2';
//para hacer la llamada de subir
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit {
  //recojo del padre
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
  
  //Tamanno de json
  tamanno:any = listadeTamanno;
  tamannoSeleccionable: any;

  //colores de la bd
  colorLetra: string = this.usuario.color_fuente;
  colorFondo: string = this.usuario.color_fondo;
  tamannoLetra:string = this.usuario.tamanno_letra;

  //colores defecto del boton
  colorBotonFondo:string="#198754";
  colorBotonLetra:string="white";

  //comprobacion de colores
  iguales: boolean = false;

//paso el id del usuario y guado la extension y el nombre del archivo
  idYFoto = {
    id:"",
    nombre:"",
    extension:""
  }
//paso el id del usuario y la presonalizacion
  idYColores={
    id:"",
    tamanno:"",
    colorFondo:"",
    colorletra:""
  }

  //archivo
  nombreArchivo = '';
  urlFotos='http://localhost/sinestesia/contenido/fotos/';

  constructor(private usuariosServicio: UsuariosService,private http: HttpClient) { }

  ngOnInit(): void {
    this.recuperarUsuario();
    this.coloresSelecionables = this.colores.colors
    this.tamannoSeleccionable = this.tamanno.Tamannos

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
      //metodos
      this.recuperarFoto();
      this.cambiarIdAColorFondo(datos[5]);
      this.cambiarIdATamanno(datos[4]);
      this.cambiarIdAColorLetra(datos[6]);

    });
  }




 




//subir la foto
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
   
  onFileSelected(event:any) {
//archivo que recojo
    const file:File = event.target.files[0];

    if (file) {
      //nombre del archivo
        this.nombreArchivo = file.name;
      //formato
        const formData = new FormData();

        formData.append("thumbnail", file);
      //subir el archivo al php
        const upload$ = this.http.post("http://localhost/sinestesia/subirFotos.php", formData);

        upload$.subscribe();
    }
}

  //falta el archivo
  get f(){
    return this.myForm.controls;
  }
   //cuando cambia el input del archivo
  onFileChange(event:any) {
   
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  } 
   //subir la foto
  submit(){
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource')?.value);
      
    this.http.post('http://localhost/sinestesia/subirFotos.php', formData)
      .subscribe((datos:any) => {
        console.log(datos['mensaje']);
       
     
        if(datos['mensaje']){
       //recoger el nombre de la foto y el id del usuario
       this.idYFoto.id = this.usuario.id
       this.idYFoto.nombre =   datos['id']
       this.idYFoto.extension =  datos['nombreCompleto']
      //una vez recogido mando todos estos datos a la bd
          this.ActualizarFoto();
         
        }else{
       
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'no se pueden subir archivos de este tipo',
          })
        }
      
      })
  }

  ActualizarFoto(){

    this.usuariosServicio.ActualizarFoto(this.idYFoto).subscribe((datos: any) => {
      if (datos['resultado']=='OK') {
        Swal.fire({
          icon: 'success',
          title: 'Foto actualizada correctamente',
          showConfirmButton: false,
          timer: 700
        })
      }
    })
  }
//recogo la foto de la bd
  recuperarFoto(){
    this.usuariosServicio.RecuperarFoto(this.usuario.id).subscribe((datos: any) => {
      this.idYFoto.extension = datos['mensaje']
    })

  }

  //personalizacion

  seleccionarLetra(e: any) {
    var idColor: any = e.target.value
    this.cambiarIdAColorLetra(idColor);
    this.usuario.color_fuente = idColor

  }

  
  seleccionarTamanno(e: any) {
    var idTamanno: any = e.target.value
    this.cambiarIdATamanno(idTamanno);
    this.usuario.tamanno_letra = idTamanno
    
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
  cambiarIdATamanno(idtamanno:any){
    for (let i = 0; i < this.tamannoSeleccionable.length; i++) {
        if(this.tamannoSeleccionable[i].id == idtamanno){
          this.tamanno = this.tamannoSeleccionable[i].tamanno
        }
    }

  }

  cambiarIdAColorLetra(idColor: any) {
    for (let i = 0; i < this.coloresSelecionables.length; i++) {
      if (this.coloresSelecionables[i].id == idColor) {
        this.colorLetra = this.coloresSelecionables[i].color
        //compruebo que no son iguales
        this.comprobarColores()
        this.colorBotonFondo=this.colorLetra
        this.colorBotonLetra=this.colorFondo
        if (this.iguales) {
          this.colorFondo = "white"
          this.colorLetra = "black"
          this.colorBotonFondo="#198754";
          this.colorBotonLetra="white";
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'no puedes tener el mismo color para las dos cosas',
          })

          this.iguales=false

          //comprobaciones de colores
        } if (this.colorFondo == "black" && this.colorLetra == "") {
          this.colorLetra = "white"
          this.colorBotonFondo="white";
          this.colorBotonLetra="black"
          ;
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
      //compruebo que no son iguales
        this.comprobarColores()
        this.colorBotonFondo=this.colorLetra
        this.colorBotonLetra=this.colorFondo
        //cambio de colores
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
        this.colorFondo = "white"
        this.colorLetra = "black"
        this.colorBotonFondo="#198754";
        this.colorBotonLetra="white";

        this.iguales=false

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'no puedes tener el mismo color para las dos cosas',
        })
        

      }
    }
  }

  comprobarColores() {

    if (this.colorFondo == this.colorLetra) {
      this.iguales = true
    }
  }  
  
  //mandar a la bd la personalizacion
  personalizar(){
    this.idYColores.id = this.usuario.id
    if(this.usuario.color_fondo == this.usuario.color_fuente){
      this.idYColores.colorFondo = "2"
      this.idYColores.colorletra = "1"
    } else {
      this.idYColores.colorFondo = this.usuario.color_fondo
      this.idYColores.colorletra = this.usuario.color_fuente
    }
   

    this.idYColores.tamanno = this.usuario.tamanno_letra

    this.usuariosServicio.Personalizar(this.idYColores).subscribe((datos: any) => {
    
      if (datos['resultado']=='OK') {
        Swal.fire({
          icon: 'success',
          title: 'Colores cambiados correctamente',
          showConfirmButton: false,
          timer: 700
        })
      }
    
    });

  }

  
  //contraseñas

  cambiarContrasenna(){
    //si los campos no estan vacios y la contraseña de confirmacion es igual
    if(this.usuario.contrasennaAntigua!=""){
     if(this.usuario.contrasennaConfirmacion!=""){
      if(this.usuario.contrasennaConfirmacion1!=""){
        if(this.usuario.contrasennaConfirmacion == this.usuario.contrasennaConfirmacion1){

          //si la nueva contraseña tiene los requisitos          
          if(this.comprobarContrasenna(this.usuario.contrasennaConfirmacion)){

            //compruebo si la contraseña anterior es la que tenia antes
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
        //actualizo la contraseña
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
