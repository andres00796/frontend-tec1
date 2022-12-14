import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
//import { ToastrService } from 'ngx-toastr';
//import { ToastrService } from 'ngx-toastr';
import { NewUser } from 'src/app/models/new-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { VariableService } from 'src/app/services/variable.service';
import { NavController } from '@ionic/angular';
import { Login } from 'src/app/models/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user?: Login;
  nameUser: string="";
  password: string="";

  constructor(

    private auth_service:AuthService,
    private token_service: TokenService,
    private toastController: ToastController,
    private router: Router,
    private readonly variableservice:VariableService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {}
  
  onLogin():void{

    this.user = new Login(this.nameUser, this.password);
    this.auth_service.login(this.user).subscribe(
      data => {
        if(!data.token)
        {
          this.toast(data.message)
        }else {
         // this.variableservice.filter('click');
         // this.navCtrl.pop();
          this.token_service.setToken(data.token)
          // this.router.navigate(['/home'])
          // this.variableservice.filter('click');
          this.router.navigateByUrl('/login', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/home']));

        }
      }
    )
}
register(){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate(['/register']));
}

async toast(message:string)
{ 
  const msg = await this.toastController.create(
    {
      message: message,
      duration: 3000,
      position: 'bottom',
      color:'danger'
    }
  ) 
  msg.present();
}



}
