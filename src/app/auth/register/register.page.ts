import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewLogin } from 'src/app/models/new-login';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user?: NewLogin;
  name: string="";
  password: string="";
  re_password: string="";

  constructor(
    private auth_service:AuthService,
    private token_service: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegister():void{
    if(this.password==this.re_password)
    {

    
    this.user=new NewLogin(this.name, this.password)
    this.auth_service.register(this.user).subscribe(
      data => {
        // this.toastr_service.success(data.message,'Ok',{
        //   timeOut:3000, positionClass:'toast-top-right'
        //});

        //this.listUser.listUser();
        this.router.navigate(['/list-user']);
      }, err =>{
        // this.toastr_service.error(err.error.message,'Fail',{
        //   timeOut:3000, positionClass:'toast-top-right',
        // });
      }
    )
    }else{
      alert("Las contraseñas no coinciden")
    }
  }

}
