import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
 
declare var google;

/**
 * Generated class for the BuscaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html',
})
export class BuscaPage {

  map: any;
 
  constructor(private geolocation: Geolocation) { }
 
  ionViewDidLoad() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
 
        const mapOptions = {
          zoom: 18,
          center: position
        }
 
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
 
        const marker = new google.maps.Marker({
          position: position,
          map: this.map
        });
 
      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }

}
