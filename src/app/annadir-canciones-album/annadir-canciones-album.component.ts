import { Component, Input, OnInit } from '@angular/core';

//alertas
import Swal from 'sweetalert2';

//servicio
import { UsuariosService } from '../usuarios.service';

//imporar los json
import listadeColores from 'src/assets/json/colores.json';
import listadeTamanno from 'src/assets/json/tamannoLetra.json';

@Component({
  selector: 'app-annadir-canciones-album',
  templateUrl: './annadir-canciones-album.component.html',
  styleUrls: ['./annadir-canciones-album.component.scss']
})
export class AnnadirCancionesAlbumComponent implements OnInit {

 
  //recojo del padre
  @Input() nombre = "";

  idAlbum:string = "";
  idCancion:string = "";


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
  CancionesArtista:any;

  constructor(private usuariosServicio: UsuariosService) { }

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
      //recoger albums y canciones
      this.recogerAlbumesArtista();
      this.recogerCancionesArtista();

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

        //recoger albumes y canciones

        recogerAlbumesArtista() {
          this.usuariosServicio.recogerAlbumsArtista(this.usuario.id).subscribe((datos: any) => {
            this.albumesArtista = datos;
          
          })
        }

        recogerCancionesArtista() {
          this.usuariosServicio.recogerCancionesArtista(this.usuario.id).subscribe((datos: any) => {
            this.CancionesArtista = datos;
           console.log(this.CancionesArtista);
           
          })
        }

        seleccionarAlbum(e: any) {
          this.idAlbum =  e.target.value
        }
        seleccionarCancion(e: any) {
          this.idCancion =  e.target.value
        }

}
