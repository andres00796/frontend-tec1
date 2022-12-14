import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Contact } from 'src/app/models/contact';
import { User } from 'src/app/models/user';
import { ContactService } from 'src/app/services/contact.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.page.html',
  styleUrls: ['./detail-user.page.scss'],
})
export class DetailUserPage implements OnInit {

  user?: User ;
  contact: Contact[]=[];
  is_admin:boolean=false;
  list_empty=undefined;
  is_logged?:boolean;

  constructor(
    private toastController: ToastController,
    private alertControler: AlertController,
    private userService: UserService,
    private token_service: TokenService,
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.listUser();
    this.token_service.isLogged() ? this.is_logged=true :this.is_logged=false;
  }

  listUser(): void {
    const value_id=localStorage['id_new_contact']=this.activatedRoute.snapshot.params['id'];
     console.log(value_id);
    this.userService.listById(value_id).subscribe(
        data => {
        this.user = data;
        this.list_empty = undefined;
      },
      err => {
        this.list_empty = err.error.message;
      }
    );
  }
  
  deleteContact(id?:number, name?:string):void {
    this.alert(id, name);
  }

  async alert(id?:number, name?:string){
    const alert = await this.alertControler.create(
    {
      header:"Esta seguro de que quiere eliminar este contacto?",
      message:"Si elimina contacto, no habrá vuelta atras.",
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
          this.contactService.delete(id).subscribe(res => this.listUser());
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

  addContact(){
    this.router.navigate(['/new-contact']);
  }

}
