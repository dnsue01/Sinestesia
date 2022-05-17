import { Component, Input, OnInit } from '@angular/core';

//alertas
import Swal from 'sweetalert2';

//formulario
import { FormGroup, FormControl, Validators } from '@angular/forms';

//para hacer la llamada de subir
import { HttpClient } from '@angular/common/http';




//servicio
import { UsuariosService } from '../usuarios.service';

//imporar los json
import listadeColores from 'src/assets/json/colores.json';
import listadeTamanno from 'src/assets/json/tamannoLetra.json';

@Component({
  selector: 'app-crear-play-list',
  templateUrl: './crear-play-list.component.html',
  styleUrls: ['./crear-play-list.component.scss']
})
export class CrearPlayListComponent implements OnInit {


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

  //alumbes
  albumesArtista: any;
  //canciones
  CancionesArtista: any;

  //playlisit
  playList = {
    Id_playlist: "",
    Nombre: "",
    foto: "",
    Id_usuario: ""

  }
  //comprobar si el album esta subido
  subido: boolean = false;

  //url donde estan las fotos del servidor
  urlFotos = 'http://localhost/sinestesia/contenido/fotos/';

  //archivo
  nombreArchivo = '';

  //comprobar si el palylist esta subida
  subida: boolean = false;

  constructor(private usuariosServicio: UsuariosService, private http: HttpClient) { }

  ngOnInit(): void {
    this.recuperarUsuario();
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
      this.cambiarIdATamanno(datos[4]);
      this.cambiarIdAColorFondo(datos[5]);
      this.cambiarIdAColorLetra(datos[6]);


    })
  }


  //subirFoto

  //subir la foto
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  onFileSelected(event: any) {
    //archivo que recojo
    const file: File = event.target.files[0];

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
  //subir la foto
  submit() {
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource')?.value);

    this.http.post('http://localhost/sinestesia/subirFotos.php', formData)
      .subscribe((datos: any) => {


        if (datos['mensaje']) {

          this.playList.foto = datos['nombreCompleto']

        } else {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'no se pueden subir archivos de este tipo',
          })
        }

      })
  }

  //subir Playlist
  subirPlaylist() {
    //comprobar si se han rellenado los campos
    if (this.playList.Nombre != "") {

      //agrego el id de usuario a la playlist
      this.playList.Id_usuario = this.usuario.id

      this.insertarPlaylist()

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre de la playlist no debe de estar vacio',
      })
    }


  }


  insertarPlaylist() {

    this.usuariosServicio.insertarPlaylist(this.playList).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.subido = true;
        Swal.fire({
          icon: 'success',
          title: 'Playlist subida correctamente',
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
