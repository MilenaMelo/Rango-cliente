import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

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

  constructor(private socket: Socket, private toastCtrl: ToastController) {
    socket.on('retorno-login', (dados) => {
      let toast = this.toastCtrl.create({
        message: dados.mensagem,
        duration: 2000
      });
      toast.present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  entrar() {
    this.socket.connect();
    this.socket.emit('login-cliente', {
      email: this.email,
      senha: this.senha
    });
  }

}
