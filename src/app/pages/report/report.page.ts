import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Report } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  title:string="";
  descripcion:string="";
  description:string="";
  reports:Report[]=[];
  permissionAdmin:string=localStorage['rolUser']
  constructor(
    private reportService:ReportService,
    private toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
    if(this.permissionAdmin=='admin'){
      console.log()
    this.reportService.lista().subscribe(
      data => {
        this.reports=data
        console.log(this.reports)
          //timeOut: 3000, positionClass: 'toast-top-center'
       // });
       
      },
      err => {
        
       // this.toastr.error(err.error.message, 'Fail', {
         // timeOut: 3000,  positionClass: 'toast-top-center',
        //});
      }
    );}
  }

  addReport(){
    const product = new Report(this.title, this.descripcion,'2022-12-15',1, localStorage['id_user']);

    this.reportService.save(product).subscribe(
      data => {
        this.toast("Se creo envio exitosamente","success");
          //timeOut: 3000, positionClass: 'toast-top-center'
       // });
        this.volver();
      },
      err => {
        this.toast("No envio correctamente el comentario, intente mas tarde.","danger");
       // this.toastr.error(err.error.message, 'Fail', {
         // timeOut: 3000,  positionClass: 'toast-top-center',
        //});
      }
    );
  }
  async toast(message:string, color:string)
  { 
    const msg = await this.toastController.create(
      {
        message: message,
        duration: 3000,
        position: 'bottom',
        color:''+color
      }
    ) 
    msg.present();
  }
  volver(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['home']));
  }
}
