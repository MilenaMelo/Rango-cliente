import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cpf = '';
  nome = '';
  sobrenome = '';
  email = '';
  senha1 = '';
  senha2 = '';

  loginPage = LoginPage;
  constructor(public navCtrl: NavController, private socket: Socket, private toastCtrl: ToastController) {
    socket.on('retorno-cadastro-cliente', (retorno) => {
      if (retorno == 0) { // sucesso
        this.showToast('Cadastro realizado com sucesso.');
        navCtrl.push(LoginPage);
      } else if (retorno == 1) { // cpf repetido
        this.showToast('Cadastro não realizado. CPF já cadastrado no sistema.');
      } else if (retorno == 2) { // email repetido
        this.showToast('Cadastro não realizado. Email já cadastrado no sistema.');
      }
    });
  }

  clickCadastrar() {
    if (this.senha1 !== this.senha2) {
      this.showToast('As senhas inseridas não coincidem.');
      return;
    }
    this.socket.emit('cadastro-cliente', {
      cpf: this.cpf,
      nome: this.nome,
      sobrenome: this.sobrenome,
      email: this.email,
      senha: this.senha1
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
    }).present();
  }
}
