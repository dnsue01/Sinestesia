import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
@Component({
  selector: 'app-barra-lateral',
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.scss']
})
export class BarraLateralComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute,private usuariosServicio: UsuariosService) { }

  nombre = this.route.snapshot.params["nombre"];
  opcion:string = "";
  estandar:boolean = true;

  usuario = {
    id:"",
    correo: "",
    nombre: "",
    contrasennaEncrip: "",
    tamanno_letra: "",
    color_fondo: "",
    color_fuente: "",
  }


  ngOnInit(): void {
  
    this.recuperarUsuario();

  }
  Inicio(){
    this.opcion="inicio"

    
  }
  Ajustes(){
    this.opcion="ajustes"
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
        this.recuperarTipoUsuario();
      });
    }

    //comprobar que tipo de usuario es
    recuperarTipoUsuario() {
      this.usuariosServicio.RecuperarTipoUsuario(this.usuario.id).subscribe((datos: any) => {
       this.estandar = datos["mensaje"]
 
      });
    }

}
