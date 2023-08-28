import { Component, OnInit } from "@angular/core";
import { db } from "../../config/firebasedb";
import { collection, addDoc, getDocs, doc, getDoc, getDocFromCache  } from "firebase/firestore";
import auth from "src/config/firebasedb";
import { onAuthStateChanged } from "firebase/auth";

@Component({
  selector: "app-cadastroprod",
  templateUrl: "./cadastroprod.page.html",
  styleUrls: ["./cadastroprod.page.scss"],
})
export class CadastroprodPage implements OnInit {
  constructor() {}

  nome: any;
  quantidade: any;
  validade: any;
  precoVenda: any;

  uid: any;

  idProdutos: any = [];

  listaProdutos: any = [];

  async ngOnInit() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        console.log(this.uid);
      }
    });

  }

  cadastroProduto(
    nome: any,
    quantidade: any,
    validade: any,
    precoProduto: any
  ) {
    console.log(nome, quantidade, validade, precoProduto);

    const produto = {
      nome: nome,
      quantidade: quantidade,
      validade: validade,
      precoProduto: precoProduto,
    };

    try {
      const docRef = addDoc(
        collection(db, this.uid, "produtos", 'produtos'),
        produto
      );
      console.log("Produto cadastrado");
    } catch (e) {
      console.log(e);
    }
  }

  async produtos(){
    const querySnapshot = await getDocs(collection(db, this.uid, 'produtos', 'produtos' ));
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());

      const produto = doc.data()
      const id = doc.id      

      if(this.idProdutos.indexOf(id) >= 0){
        console.log('Esta no array')
      }else{
        this.idProdutos.push(id)
        console.log('Id cadastrado ' + id);
        
        this.listaProdutos.push(
          {
            nome: produto['nome'],
            quantidade: produto['quantidade'],
            validade: produto['validade'],
            precoProduto: produto['precoProduto']
          }    
        )
      }

      }

    );    

  }
}
