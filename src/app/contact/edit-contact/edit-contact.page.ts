import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {

  contact?: Contact;

  constructor(
    private toastController: ToastController,
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
     const id = this.activatedRoute.snapshot.params['id'];
     this.contactService.detail(id).subscribe(
       data => {
         this.contact = data;
         
       },
       err => {
         this.toast(err.message,false)
          // this.toastr.error(err.error.message, 'Fail', {
          //   timeOut: 3000,  positionClass: 'toast-top-center',
          // });
         //this.volver();
       }
     );
  }
  

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.contactService.update(id, this.contact).subscribe(
      data => {
        this.toast(data.message,true)
        // , 'Contacto actualizado', {
        //   timeOut: 3000, positionClass: 'toast-top-center'
        // });
      //   this.router.navigate(['/detail-user',localStorage['id_new_contact']
      // ]);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['detail-user',localStorage['id_new_contact']]));


      },
      err => {
        this.toast(err.message,false)
        // this.toastr.error(err.error.message, 'Fail', {
        //   timeOut: 3000,  positionClass: 'toast-top-center',
        // });
      }
    );
  }

  async toast(message:string, states:boolean)
{ 
  let messages="",colors="";

  states? messages='Contacto actualizado':messages=message
  states? colors='success':colors='danger'
  const msg = await this.toastController.create(
    {
      message: messages,
      duration: 3000,
      position: 'bottom',
      color: colors
    }
  ) 
  msg.present();
}

  volver(): void {
    this.router.navigate(['/list']);
  }

}
