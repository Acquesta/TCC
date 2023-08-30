import { db } from 'src/config/firebasedb';
import auth from 'src/config/firebasedb';
import { Component, OnInit } from '@angular/core';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-listaprod',
  templateUrl: './listaprod.page.html',
  styleUrls: ['./listaprod.page.scss'],
})
export class ListaprodPage implements OnInit {

  constructor() { }

  uid:any;

  listaProdutos: any = [];
  idProdutos: any = [];

  ngOnInit() {
    onAuthStateChanged(auth, async (user) => {
      if(user){
        this.uid = user.uid

        const querySnapshot = await getDocs(collection(db, this.uid, 'produtos', 'produtos'));
        querySnapshot.forEach((doc) => {

          const produto = doc.data()

          this.idProdutos.push(doc.id)

          this.listaProdutos.push(
            {
              nome: produto['nome'],
              quantidade: produto['quantidade'],
              validade: produto['validade'],
              precoProduto: produto['precoProduto']
            }    
          )
        })

        console.log(this.idProdutos);
        console.log(this.listaProdutos)
        
      }
    })

  }

}
