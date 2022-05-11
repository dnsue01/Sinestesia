import { Component, Input, OnInit } from '@angular/core';
//servicio
import { UsuariosService } from '../usuarios.service';

//imporar los json
import listadeColores from 'src/assets/json/colores.json';
import listadeTamanno from 'src/assets/json/tamannoLetra.json';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

//para hacer la llamada de subir
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-cancion',
  templateUrl: './crear-cancion.component.html',
  styleUrls: ['./crear-cancion.component.scss']
})
export class CrearCancionComponent implements OnInit {

  //recoger el nombre
  @Input() nombre = "";

  //usario
  usuario = {
    id: "",
    correo: "",
    nombre: "",
    contrasennaEncrip: "",
    tamanno_letra: "",
    color_fondo: "",
    color_fuente: "",
  }
  //cancion
  cancion = {
    Id_cancion: "",
    Nombre: "",
    Url_cancion: "",
    Url_caratula: "",
    Id_artista: "",
    Id_adminAu: "",
    explicita: "",
    Autorizada: ""
  }

  //colores de la bd
  colorLetra: string = this.usuario.color_fuente;
  colorFondo: string = this.usuario.color_fondo;
  tamannoLetra: string = this.usuario.tamanno_letra;
  //colores defecto del boton
  colorBotonFondo: string = this.colorLetra;
  colorBotonLetra: string = this.colorFondo;

  //Colores de json
  colores: any = listadeColores;
  coloresSelecionables: any;

  //Tamanno de json
  tamanno: any = listadeTamanno;
  tamannoSeleccionable: any;

  //url donde estan las fotos del servidor
  urlFotos = 'http://localhost/sinestesia/contenido/fotos/';

  //url donde estan las canciones del servidor
  urlCanciones = 'http://localhost/sinestesia/contenido/canciones/';

  //si esta subida la cancion pude ponerse una caratula
  subida: boolean = false;
  //si la carutala es correcta
  caratula:boolean = false;

  //explicita
  explicita= '';
  

  //archivo
  nombreCancion = '';
  nombreFoto = '';

  constructor(private usuariosServicio: UsuariosService, private http: HttpClient) { }

  ngOnInit(): void {
    this.recuperarUsuario()
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

      //colores y tamaños
      this.coloresSelecionables = this.colores.colors
      this.tamannoSeleccionable = this.tamanno.Tamannos
      //metodos
      this.cambiarIdATamanno(datos[4])
      this.cambiarIdAColorFondo(datos[5])
      this.cambiarIdAColorLetra(datos[6])



    });
  }


  //subir la cancion

  //compruebo que el formulario ha recivido un archivo
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  //subir la foto
  myForm1 = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  //segundo paso recojo el primer archivo de los que ha pasado

  onFileSelected(event: any) {
    //archivo que recojo
    const file: File = event.target.files[0];

    if (file) {
      //nombre del archivo
      this.nombreCancion = file.name;
      //formato
      const formData = new FormData();

      formData.append("thumbnail", file);
      //subir el archivo al php
      const upload$ = this.http.post("http://localhost/sinestesia/subirCanciones.php", formData);

      upload$.subscribe();
    }
  }

  onFileSelected1(event: any) {
    //archivo que recojo
    const file: File = event.target.files[0];

    if (file) {
      //nombre del archivo
      this.nombreFoto = file.name;
      //formato
      const formData = new FormData();

      console.log(this.nombreFoto);
      
      formData.append("thumbnail", file);
      //subir el archivo al php
      const upload$ = this.http.post("http://localhost/sinestesia/subirFotos.php", formData);

      upload$.subscribe();
    }
  }

  //excepccion para saber que falta el archivo falta el archivo
  get f() {
    return this.myForm.controls;
  }
  //cuando cambia el input del archivo
  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }
 //cuando cambia el input del archivo
 onFileChange1(event: any) {

  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.myForm1.patchValue({
      fileSource: file
    });
  }
}

  //subir la cancion

  
  submitCancion() {
    //compruebo el nombre antes de subir nada
    if (this.cancion.Nombre != "") {

      //comprobacion del nombre
      this.comprobarNombreCancion();


    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo del nombre no pude estar vacio',
      })
    }

  }
  comprobarNombreCancion() {


    this.usuariosServicio.comprobarNombreCancion(this.cancion.Nombre).subscribe((datos: any) => {
      if (!datos["mensaje"]) {

        //enviar archivo
        const formData = new FormData();
        formData.append('file', this.myForm.get('fileSource')?.value);

    //paso el archivo al php si esta dentro de los parametros que he dictaminado se sube 
        this.http.post('http://localhost/sinestesia/subirCanciones.php', formData)
          .subscribe((datos: any) => {

            if (datos['mensaje']) {
              //recoger el nombre de la foto y el id del usuario
              this.cancion.Id_artista = this.usuario.id
              this.cancion.Url_cancion = datos['nombreCompleto']
              this.subida = true;

            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'no se pueden subir archivos de este tipo',
              })
            }
          })

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ya hay una cancion con ese nombre...Prueba otro',
        })
      }

    });
  }


  submitFoto() {

    //enviar archivo
    const formData = new FormData();
    formData.append('file', this.myForm1.get('fileSource')?.value);

    this.http.post('http://localhost/sinestesia/subirFotos.php', formData)
      .subscribe((datos: any) => {

        if (datos['mensaje']) {
          //recoger el nombre de la foto y el id del usuario
          
          this.cancion.Url_caratula = datos['nombreCompleto']
          //subida a la base de datos
          
          this.caratula = true;

        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'no se pueden subir archivos de este tipo',
          })
        }
      })
    }

    cancionExplicita(e: any){
      this.explicita = e.target.value
      this.cancion.explicita =  this.explicita
    }

    subirCancion(){
      if(this.explicita !=""){
        
        this.insertarCancion();
        
   
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tienes que elegir si es explicita o no',
        })
      }
    }

    insertarCancion(){

      this.usuariosServicio.insertarCancion(this.cancion).subscribe((datos: any) => {
        if (datos['resultado']=='OK') {
          
          Swal.fire({
            icon: 'success',
            title: 'Cancion subida perfectamente',
            showConfirmButton: false,
            timer: 700
          })
        }
      })
    }

        //personalizacion

        cambiarIdAColorFondo(idColor: any) {
          for (let i = 0; i < this.coloresSelecionables.length; i++) {
            if (this.coloresSelecionables[i].id == idColor) {
              this.colorFondo = this.coloresSelecionables[i].color
              this.colorBotonLetra = this.colorBotonFondo
            }
          }
        }

        cambiarIdATamanno(idtamanno: any) {
          for (let i = 0; i < this.tamannoSeleccionable.length; i++) {
            if (this.tamannoSeleccionable[i].id == idtamanno) {
              this.tamanno = this.tamannoSeleccionable[i].tamanno
            }
          }
        }

        cambiarIdAColorLetra(idColor: any) {
          for (let i = 0; i < this.coloresSelecionables.length; i++) {
            if (this.coloresSelecionables[i].id == idColor) {
              this.colorLetra = this.coloresSelecionables[i].color
              this.colorBotonFondo = this.colorLetra
            }
          }
        }

      }
