import { Component, OnInit } from "@angular/core";
import auth from "src/config/firebasedb";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "src/config/firebasedb";
import { userLogado } from "src/config/user";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  constructor() { }

  uid:any;

  nome: any;

  listaProdutos: any = [];
  idProdutos: any = [];

  async ngOnInit() {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        
        this.uid = user.uid;
        console.log('id do usuario :' + this.uid);

        const querySnapshot = await getDocs(collection(db, this.uid));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc);

          const db = doc.data()

          this.nome = db['nome']

          console.log(this.nome)
        });

        const produtos = getDocs(collection(db, this.uid, 'produtos', 'produtos' ));
        (await produtos).forEach((doc) => {
          const produto = doc.data()
          this.listaProdutos.push(produto)
        })

      }

    });

    // async function produtos(){
    //   const querySnapshot = await getDocs(collection(db, this.uid, 'produtos', 'produtos' ));
    //   querySnapshot.forEach((doc) => {
    //     // console.log(doc.id, " => ", doc.data());
  
    //     const produto = doc.data()
    //     const id = doc.id      
  
    //     if(this.idProdutos.indexOf(id) >= 0){
    //       console.log('Esta no array')
    //     }else{
    //       this.idProdutos.push(id)
    //       console.log('Id cadastrado ' + id);
          
    //       this.listaProdutos.push(
    //         {
    //           nome: produto['nome'],
    //           quantidade: produto['quantidade'],
    //           validade: produto['validade'],
    //           precoProduto: produto['precoProduto']
    //         }    
    //       )
    //     }
  
    //     }
  
    //   );    
  
    // }

  }
  


}
