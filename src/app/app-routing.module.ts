import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';
import { PaginaRegistroComponent } from './pagina-registro/pagina-registro.component';
import { PaginaInicioSesionComponent } from './pagina-inicio-sesion/pagina-inicio-sesion.component';
import { BarraLateralComponent } from './barra-lateral/barra-lateral.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { PaginaPrincipalUsuarioComponent } from './pagina-principal-usuario/pagina-principal-usuario.component';

const routes: Routes = [
  { path: "",redirectTo:"inicio" ,pathMatch:"full"},  //ruta por defecto
  { path: "inicio", component: PaginaInicioComponent },
  { path: "registro", component: PaginaRegistroComponent },
  { path: "inicioSesion", component: PaginaInicioSesionComponent },
  { path:"principal/:nombre",component:BarraLateralComponent,
  children:[
    {path:"",redirectTo:"defecto",pathMatch:"full"},
    {path:"ajustes",component:AjustesComponent},
    {path:"defecto",component:PaginaPrincipalUsuarioComponent},
  ]},
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
