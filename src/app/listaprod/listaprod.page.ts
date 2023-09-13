import { db } from 'src/config/firebasedb';
import auth from 'src/config/firebasedb';
import { Component, OnInit } from '@angular/core';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { exibirToast } from 'src/config/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listaprod',
  templateUrl: './listaprod.page.html',
  styleUrls: ['./listaprod.page.scss'],
})
export class ListaprodPage implements OnInit {

  constructor(public router: Router) { }

  uid:any;

  listaProdutos: any = [];

  ngOnInit() {
    onAuthStateChanged(auth, async (user) => {
      if(user){
        this.uid = user.uid

        const querySnapshot = await getDocs(collection(db, this.uid, 'produtos', 'produtos'));
        querySnapshot.forEach((doc) => {

          const produto = doc.data()

          this.listaProdutos.push(
            {
              nome: produto['nome'],
              quantidade: produto['quantidade'],
              validade: produto['validade'],
              precoProduto: produto['precoProduto'],
              id: doc.id
            }            
          )
        })

        console.log(this.listaProdutos)
        
      }
    })

  }

  async excluirProduto(idp: any){
    

    const deletar = await deleteDoc(doc(db, this.uid, 'produtos', 'produtos', idp))
    .then(() => {
      exibirToast('Produto excluído, recarregue a página', 6000, 'success', 'top')
      // window.location.reload();
    })
  }

}


