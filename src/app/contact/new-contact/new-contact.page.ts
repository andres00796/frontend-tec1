import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.page.html',
  styleUrls: ['./new-contact.page.scss'],
})
export class NewContactPage implements OnInit {

  name = '';
  phone: string='';
  relationship: string=''; 
  
  id_user:number =localStorage['id_user_contact'];
  id_new_contact:number= localStorage['id_new_contact'];

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.id_new_contact);
  }

  addContact(): void {
    
    const contact = new Contact(this.name, this.phone, this.relationship);

    this.contactService.save(this.id_new_contact,contact).subscribe(
      data => {
        //this.toastr.success(data.message, 'Se creo el contacto correctamente', {
          //timeOut: 3000, positionClass: 'toast-top-center'
       // });
        this.volver();
      },
      err => {
       // this.toastr.error(err.error.message, 'Fail', {
         // timeOut: 3000,  positionClass: 'toast-top-center',
        //});
      }
    );
  }

  volver(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['detail-user',this.id_new_contact]));
  }

}
