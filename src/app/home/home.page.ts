import { Component } from '@angular/core';
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from '../../config/firebasedb'
import { Router } from '@angular/router';
import { VerifyErroCode } from 'src/config/erros';
import { exibirToast } from 'src/config/alert';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router) {}

  email: any;
  senha: any;

  login(email: any, senha:any){
    signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) =>{
        const user = userCredential.user
        this.router.navigate(['../inicio'])
    })
    .catch((error) =>{
      const errorCode = error.code;
      const erroMensagm = VerifyErroCode(errorCode)
      exibirToast(erroMensagm, 3000, 'danger', 'top')
    })
  }

}
