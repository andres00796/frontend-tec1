import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.page.html',
  styleUrls: ['./list-user.page.scss'],
})
export class ListUserPage implements OnInit {

  user: User[] = [];
  contact:Contact[]=[];
  is_admin:boolean=false;
  list_empty=undefined;
  constructor(
    private toastController: ToastController,
    private alertControler: AlertController,
    private userService: UserService,
    private token_service: TokenService,
    private menu: MenuController,
    private router:Router
  ) { }

  ngOnInit() {
    this.listUser();
    this.menu.close();
  }

  listUser(): void {
    this.userService.list().subscribe(
      data => {
        this.user = data;
        this.list_empty = undefined;
      },
      err => {
        this.list_empty = err.error.message;
      }
    );
  }
 
  delete(id?:number, name?:string):void {
   this.alert(id,name);
  }

  async alert(id?:number, name?:string){
    const alert = await this.alertControler.create(
    {
      header:"Esta seguro de que quiere eliminar este usuario?",
      message:"Si elimina el usuario, tambien sus contactos se eliminaran",
      buttons: [
        {
          text:'NO',
          handler:()=>{
            this.toast(name,false)
          },
        },
        {
          text:'SI',
          handler:()=>{
          this.userService.delete(id).subscribe(res => this.listUser());
          this.toast(name,true)
         }
        }
        ],
    });
  await alert.present();
  }

  async toast(name:string, estate: boolean)
  { 
     let color_toast='', ms='';
     estate ?color_toast='success':color_toast='danger';
     estate ?ms='Se ':ms='No se ';
     
    const msg = await this.toastController.create(
      {
        message: ms+'elimino al contacto '+name,
        duration: 3000,
        position: 'bottom',
        color:''+color_toast
      }
    ) 
    msg.present();
  }

  addUser(): void {
    this.router.navigate(['/register']);
  }

}
