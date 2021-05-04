import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interface/interface';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';
//import { Server, ServerResponse } from 'http';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia:Article;
  @Input() i:number;
  @Input() favoritos:boolean;
  

  constructor(private dataLocalServ:DataLocalService,private iab: InAppBrowser, public actionSheetController: ActionSheetController, private socialSharing: SocialSharing) { }


  ngOnInit() {}

  abrirNoticia(){
   const  browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){

    let borrarAñadirFavorito;

    if(this.favoritos === true){
       borrarAñadirFavorito={
      
        text: 'Borrar',
        icon: 'trash',
        cssClass: 'action-sheet-my',
        handler: () => {
          console.log('favorito');
          this.dataLocalServ.borrarFavorito(this.noticia);
        }
    }
     
    }else{
       borrarAñadirFavorito={
      
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-sheet-my',
        handler: () => {
          console.log('favorito');
          this.dataLocalServ.guardarNoticia(this.noticia);
          this.dataLocalServ.presentToast();
        }
        
    }

    }
   
      const actionSheet = await this.actionSheetController.create({
       
        buttons: [ {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-sheet-my',
          handler: () => {
          this.socialSharing.share(this.noticia.title, this.noticia.source.name, '', this.noticia.url);
          }
        }, borrarAñadirFavorito,  {
          text: 'Cancelar',
          icon: 'close',
          cssClass: 'action-sheet-my',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }
  

  
 
   
}
