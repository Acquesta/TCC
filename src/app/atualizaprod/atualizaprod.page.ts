import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'src/config/firebasedb';

@Component({
  selector: 'app-atualizaprod',
  templateUrl: './atualizaprod.page.html',
  styleUrls: ['./atualizaprod.page.scss'],
})
export class AtualizaprodPage implements OnInit {

  constructor(private rotaAtiva: ActivatedRoute) { }

  id:any;
  idp:any;

  nome:any;
  quantidade:any;
  validade:any;
  precoProduto:any;

  async ngOnInit() {
     this.id = this.rotaAtiva.snapshot.params['id']
     this.idp = this.rotaAtiva.snapshot.params['idp']

     const produto = await getDoc(doc(db, this.id, 'produtos', 'produtos', this.idp))
     console.log(produto);
     
  }

  editarProduto(){
    
  }

}
