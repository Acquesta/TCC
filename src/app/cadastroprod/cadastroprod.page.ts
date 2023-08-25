import { Component, OnInit } from "@angular/core";
import { db } from "../../config/firebasedb";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
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
        collection(db, this.uid, "produtos", nome),
        produto
      );
      console.log("Produto cadastrado");
    } catch (e) {
      console.log(e);
    }
  }

  async produtos(){
    const querySnapshot = await getDoc(doc(db, this.uid, 'produtos' ));
    // const ala = await getDocFromCache(querySnapshot);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id);

    //   const produtos = doc.data()
      
    // });
    
    console.log(querySnapshot.data());
    

  }
}
