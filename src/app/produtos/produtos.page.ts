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

  async ngOnInit() {
    this.uid = this.rotaAtiva.snapshot.params['uid']

    const produtos = await getDocs(collection(db, this.uid, 'produtos', 'produtos'))
    produtos.forEach((doc) => {
      const produto = doc.data()
      this.listaProdutos.push([doc.data(), doc.id])
    });

    console.log(this.listaProdutos);
    
  }

  paginaInicio(){
      this.router.navigate(['../inicio'])
  }

}
