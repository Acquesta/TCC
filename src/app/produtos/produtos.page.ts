import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'src/config/firebasedb';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  constructor(public rotaAtiva: ActivatedRoute,
    public router: Router) { }

  uid:any;

  listaProdutos: any = [];

  topTresMaisVendas: any = [];

  async ngOnInit() {
    this.uid = this.rotaAtiva.snapshot.params['uid']

    const produtos = await getDocs(collection(db, this.uid, 'produtos', 'produtos'))
    produtos.forEach((doc) => {
      const produto = doc.data()
      this.listaProdutos.push([doc.data(), doc.id])
    });

    console.log(this.listaProdutos);
    
    this.listaProdutos.forEach((doc:any) => {
      const produto = doc[0]
      this.topTresMaisVendas.push([produto.venda, doc[1]])   
    });

    // Filtragem produtos mais vendidos
    this.topTresMaisVendas[0].sort(function(a:any, b:any){
      if(a > b) return 1;
      if(a < b) return -1;

      return 0
    })

    console.log(this.topTresMaisVendas);
  
  }

  paginaInicio(){
      this.router.navigate(['../inicio'])
  }

}
