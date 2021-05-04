import { Injectable } from '@angular/core';
import { Storage} from '@ionic/storage';
import { Article } from '../interface/interface';
import { ToastController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage, public toastController: ToastController) { 
  
  }

  guardarNoticia(noticia){
    const existe = this.noticias.find(noti=> noti.title === noticia.title);

    if (!existe){
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }

  }

  async cargarfavoritos(){
    const favoritos = await this.storage.get('favoritos');
    this.noticias = favoritos;
  }

  ngAfterViewInit() {
  
    this.cargarfavoritos();
  }

  borrarFavorito(noticiaTitulo){
    this.noticias = this.noticias.filter(noti=> noti.title !==noticiaTitulo.title);
    this.storage.set("favoritos", this.noticias)
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Se ha añadido a Favoritos',
      duration: 2000
    });
    toast.present();
  }
}
