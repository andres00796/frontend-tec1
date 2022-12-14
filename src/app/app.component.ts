import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TokenService } from './services/token.service';
import { VariableService } from 'src/app/services/variable.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  my_id:string=localStorage['id_user'];
  islogin:boolean=this.token_service.isLogged();
  constructor(
    private token_service:TokenService,
    private router:Router,
    private menu:MenuController,
    private variableservice:VariableService,
    public navCtrl: NavController,
    
  ) {}
  ionViewDidEnter(){
    this.variableservice.filter('click');
    this.islogin=true;
    console.log('acabamos de entrar')
  }
  menuClose()
  {
    this.menu.close();
  }
  logOut(): void{
    this.islogin=false;
    
    this.token_service.logOut();
    this.menu.close();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['login']));
    this.variableservice.filter('click');
    
  }
  logIn(){
    this.menu.close();
    this.router.navigate(['login']);
  }

}
