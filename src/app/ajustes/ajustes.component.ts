import { Component, Input, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit {
  @Input() nombre="";

  usuario = {
    correo: "",
    nombre: "",
    contrasennaEncrip: "",
    contrasennaConfirmacion: "",
    contrasennaConfirmacion1: "",
    tamanno_letra: "",
    color_fondo: "",
    color_fuente:"",
    tamanno_fuente:""
  }
  
  constructor(private usuariosServicio: UsuariosService) { }

  ngOnInit(): void {
    this.recuperarUsuario();
  }

  recuperarUsuario() {
    this.usuariosServicio.recuperarUsuario(this.nombre).subscribe((datos: any) => {
   
      
        this.usuario.correo = datos[1];
        this.usuario.nombre = datos[2];
        this.usuario.contrasennaEncrip = datos[3];
        this.usuario.tamanno_letra = datos[4];
        this.usuario.color_fondo = datos[5];
        this.usuario.color_fuente = datos[6];
        this.usuario.tamanno_fuente = datos[7];
        
    });
  }




}
