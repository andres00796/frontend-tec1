import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ContactService } from 'src/app/services/contact.service';
import { User } from 'src/app/models/user';
import { Contact } from 'src/app/models/contact';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.page.html',
  styleUrls: ['./list-contact.page.scss'],
})
export class ListContactPage implements OnInit {

  contact: Contact[] = [];
  user?: User ;

  list_empty=undefined;

  is_admin:boolean=false;
  id_user?: number ;

  constructor(
    private toastController: ToastController,
    private alertControler: AlertController,
    private userService: UserService,
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private token_service: TokenService,
    private menu: MenuController
    ) { }

  ngOnInit(): void {
    this.listContact();
    this.openEnd();
    this.menu.close();
    // this.is_admin = this.token_service.isAdmin();
    // if(this.is_admin){
    //   this.listContact();
    // }else{
    //   this.listContactId();
    // }
  }

  listContact(): void {
    this.contactService.lista().subscribe(
      data => {
        this.contact = data;
        this.list_empty = undefined;
      },
      err => {
        this.list_empty = err.error.message;
      }
    );
  }

  listContactId(): void {
    this.contactService.listById(parseInt(localStorage.getItem('id_user')+'')).subscribe(
        data => {
        this.contact = data;
        this.list_empty = undefined;
      },
      err => {
        this.list_empty = err.error.message;
      }
    );
  }

  delete(id?:number, name?:string):void {
    this.alert(id, name);
    // Swal.fire({
    //   title: '¿Estás seguro?',
    //   text: 'No hay vuelta atrás',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Sip',
    //   cancelButtonText: 'Nops'
    // }).then((result) => {
    //   if (result.value) {
    //     this.contactService.delete(id).subscribe(res => this.listContact());
    //     Swal.fire(
    //       'OK',
    //       'Producto eliminado',
    //       'success'
    //     );
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     Swal.fire(
    //       'Cancelado',
    //       'Producto a salvo',
    //       'error'
    //     );
    //   }
    // });
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
          this.contactService.delete(id).subscribe(res => this.listContact());
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
  
  guardarId(id?:number):void
  {
    localStorage.setItem('id_user_contact',id+'');
  }
  openEnd() {
    this.menu.close();
  }

}
