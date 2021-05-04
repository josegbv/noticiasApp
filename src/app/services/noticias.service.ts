import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadLine } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

paginaTopHead = 0;

categoriaActual = '';
paginaActual = 0;

  constructor(private httpClient:HttpClient) { 
  
  }

  getTopHeadLine(){
    this.paginaTopHead++;
   return  this.httpClient.get<RespuestaTopHeadLine>( `http://newsapi.org/v2/top-headlines?country=ve&page=${this.paginaTopHead}&apiKey=c5130c30b3744658b62da3c36105fb65`)
  }

  getTopHeadLineCategory(categoria:string){
  if(this.categoriaActual === categoria){
    this.paginaActual = this.paginaActual + 1;
  }else{
    this.paginaActual = 1;
    this.categoriaActual = categoria
  }
  
    return this.httpClient.get<RespuestaTopHeadLine>(`https://newsapi.org/v2/top-headlines?country=ve&category=${categoria}&page=${this.paginaActual}&apiKey=c5130c30b3744658b62da3c36105fb65`)
  }
}
