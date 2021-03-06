import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';
import { PaginaRegistroComponent } from './pagina-registro/pagina-registro.component';
import { PaginaInicioSesionComponent } from './pagina-inicio-sesion/pagina-inicio-sesion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarraLateralComponent } from './barra-lateral/barra-lateral.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AjustesComponent } from './ajustes/ajustes.component';

import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PaginaPrincipalUsuarioComponent } from './pagina-principal-usuario/pagina-principal-usuario.component';

import {  ReactiveFormsModule } from '@angular/forms';
import { CrearCancionComponent } from './crear-cancion/crear-cancion.component';
import { CrearAlbumComponent } from './crear-album/crear-album.component';
import { AlbumComponent } from './album/album.component';
import { AnnadirCancionesAlbumComponent } from './annadir-canciones-album/annadir-canciones-album.component';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { CrearPlayListComponent } from './crear-play-list/crear-play-list.component';
import { ListaPlayListComponent } from './lista-play-list/lista-play-list.component';
import { PlayListComponent } from './play-list/play-list.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ArtistaComponent } from './artista/artista.component';
import { PaisComponent } from './pais/pais.component';


@NgModule({
  declarations: [
    AppComponent,
    PaginaInicioComponent,
    PaginaRegistroComponent,
    PaginaInicioSesionComponent,
    BarraLateralComponent,
    AjustesComponent,
    PaginaPrincipalUsuarioComponent,
    CrearCancionComponent,
    CrearAlbumComponent,
    AlbumComponent,
    AnnadirCancionesAlbumComponent,
    PanelControlComponent,
    CrearPlayListComponent,
    ListaPlayListComponent,
    PlayListComponent,
    BusquedaComponent,
    ArtistaComponent,
    PaisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
