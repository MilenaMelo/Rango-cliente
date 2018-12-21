import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  produtos = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
    socket.on('retorno-pesquisa-produto', (produtos) => {
      this.produtos = produtos;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutosPage');
  }

  pesquisar(evento: any) {
    var busca = evento.target.value;

    if (busca && busca.trim() != '') {
      this.socket.emit('pesquisa-produto', { textoPesquisa: busca });
    }
  }

}
