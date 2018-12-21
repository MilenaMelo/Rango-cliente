import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { BuscaPage } from '../busca/busca';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email = '';
  senha = '';

  constructor(private navCtrl: NavController, private socket: Socket, private toastCtrl: ToastController) {
    socket.on('retorno-login-cliente', (retorno) => {
      if (retorno === 0) { // sucesso
        navCtrl.push(BuscaPage);
      } else if (retorno === 1) { // email não cadastrado
        this.showToast('Email não cadastrado no sistema.');
      } else if (retorno === 2) { // senha incorreta
        this.showToast('Senha incorreta.');
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  clickEntrar() {
    this.socket.emit('login-cliente', {
      email: this.email,
      senha: this.senha
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
    }).present();
  }
}
