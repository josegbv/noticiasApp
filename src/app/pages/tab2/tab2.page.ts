import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interface/interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  noticias:Article[] = [];
  general= "general";

  @ViewChild(IonSegment, { static: true }) segment:IonSegment;

  categorias = [   
    {valor:"general",
    titulo:"General"},
    
    { valor:"business",
    titulo: "Negocios"},

    {valor:"entertainment", 
    titulo:"Entretenimiento"},

    {valor:"health",
    titulo:"Salud"},
      
    {valor:"science",
    titulo:"Ciencia"},

    {valor: "sports",
    titulo:"Deportes"},
      
    {valor: "technology",
    titulo:"Tecnologia"},
     
     ]
  
  
  
   constructor(private NoticiasService:NoticiasService) {
    console.log("categoria", this.categorias)
   }



  ngOnInit(){
    this.segment.value = this.general;
    this.cargarNoticias(this.general);
  }

  cambio(evento){
    this.noticias = [];
   this.cargarNoticias(evento.detail.value)
}       

cargarNoticias(categoria:string, evento?){
  this.NoticiasService.getTopHeadLineCategory(categoria).subscribe(resp=>{
    console.log(resp)
    this.noticias.push(...resp.articles);

    if(resp.articles.length === 0 ){
      evento.target.disabled = true;
      evento.target.complete();
      return;      
    }

    if(evento){
      evento.target.complete();
    }
   
  });
}

loadData(evento){
 this.cargarNoticias(this.segment.value, evento)
}

}
