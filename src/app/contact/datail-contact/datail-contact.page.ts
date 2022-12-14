import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';
//import { Contact } from '../models/contact';
//import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-datail-contact',
  templateUrl: './datail-contact.page.html',
  styleUrls: ['./datail-contact.page.scss'],
})
export class DatailContactPage implements OnInit {

  contact?: Contact ;

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    //private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.detailContact();
  }
  detailContact():void
  {
     const id_contact = this.activatedRoute.snapshot.params['id'];

     this.contactService.detail(id_contact).subscribe(
        data => {
          this.contact = data;
        },
        err => {
          //this.toastr.error(err.error.message, 'Fail', {
           // timeOut: 3000,  positionClass: 'toast-top-center',
         //});
          this.volver();
        }
      );
  }

  volver(): void {
    this.router.navigate(['/list']);
  }

}
