import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

import { RestUserProvider } from '../../providers/rest-user';
import { RoleService } from '../../providers/role.service';
import { StorageService } from '../../providers/storage.service';

import { AboutPage } from '../about/about';
import { HelpPage } from '../help/help';
import { LoginPage } from '../login/login';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-menu-app',
  templateUrl: 'menu-app.html',
})

export class MenuAppPage {
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public restProvider: RestUserProvider,
    public roleService: RoleService,
    public storage: StorageService
  ){ }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }
  
  helpBtn() {
    this.navCtrl.push(HelpPage)
  }

  aboutBtn() {
    this.navCtrl.push(AboutPage)
  }

  settingsBtn() {
    this.navCtrl.push(SettingsPage)
  }

  signOutBtn() {
    let confirm = this.alertCtrl.create({
      title: 'Sair',
      message: 'Deseja realmente encerrar a sessão?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirmar',      
          handler: () => {
            this.storage.setLocalUser(null);
            this.roleService.clearRole(); 
            console.log('After logout: ', this.storage.getLocalUser());          
            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
    confirm.present();
  }
}
