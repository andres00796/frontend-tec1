import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/models/new-user';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user?: NewUser;
  nameUser: string="";
  password: string="";
  re_password: string="";
  firstName:string="";
  lastName:string="";
  rol:number = 2;

  permission:boolean=this.token_service.isLogged();
  permissionAdmin:boolean=false

  constructor(
    
    private auth_service:AuthService,
    private user_service:UserService,
    private token_service: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    if(localStorage['rolUser']){
      if(localStorage['rolUser']=='admin'){
        this.permissionAdmin=true;
      }

    }

    console.log(this.permission)
  }

  onRegister():void{
    if(this.password==this.re_password)
    {
    
    this.user=new NewUser(this.nameUser,this.password, this.firstName, this.lastName, this.rol)
    this.user_service.save(this.user).subscribe(
      data => {
        if(this.permissionAdmin){
        this.router.navigate(['/list-user']);
      }else
      {
          this.router.navigate(['/home']);
        }
      }, err =>{    
      }
    )
    }else{
      alert("Las contraseñas no coinciden")
    }
  }

}
