import { Component, OnInit } from '@angular/core';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import auth from 'src/config/firebasedb';
import { exibirToast } from 'src/config/alert';
import { VerifyErroCode } from 'src/config/erros';
import { db } from '../../config/firebasedb';
import { collection, addDoc } from "firebase/firestore";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  constructor(public router: Router) { }

  nome: any;
  nomeEmpresa: any;
  telefone: any;
  email:any;
  senha: any;
  confirmaSenha:any;

  ngOnInit() {
  }


  cadastrar(email:any, senha:any, confirmaSenha:any){
    if(senha === confirmaSenha){
      createUserWithEmailAndPassword(auth, email, senha )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Cadastrou', user)
        this.router.navigate(['../cadastroprod'])

        this.addUsuario(this.nome, this.telefone, this.nomeEmpresa)
      })
      .catch(async (error) =>{
        const errorCode = error.code;

        console.log(errorCode)

        const mensagemError = await VerifyErroCode(errorCode)

        exibirToast(mensagemError, 3000, 'danger', 'top')
      })
    }else{
      console.log('Senhas incorretas')
      exibirToast('Senhas não são iguais', 4000, 'danger', 'top')
    }
  }

  async addUsuario(nome:any, telefone:any, nomeEmpresa:any){
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}
