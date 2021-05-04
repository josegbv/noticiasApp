import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interface/interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  {

  noticias:Article[] = []; 

  constructor(private notiServ:NoticiasService) {}

  ngOnInit() {
   
  this.cargarNoticias()
    
  }

  loadData(event){
    this.cargarNoticias(event)
    console.log(event)
  }

  cargarNoticias(event?){
    
    this.notiServ.getTopHeadLine().subscribe(resp=> {console.log('noticias', resp); 
    this.noticias.push(...resp.articles);

    if(resp.articles.length === 0 ){
      event.target.disabled = true;
      event.target.complete();
      return;      
    }

    if(event){
      event.target.complete()
    }
  });
}


}

