import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DepositService } from '../_services/deposit.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss'],
})
export class ProcessingComponent implements OnInit {
  @Output() buttonClick = new EventEmitter()
  @Input() cashWithdrawal = false
  @Input() processCompleted = false
  @Input() successButtonText = 'Print Receipt'
  @Input() okButtonText = 'Ok'
  cashColleted: boolean = true;
  constructor(private router: Router,
    private depositService: DepositService,
    private camera: Camera,) { }
  goBack(){
    this.depositService.store({})
this.router.navigate(['dashbord'])
  }
  ionViewWillEnter() {
   }
  confirmCashCollected() {

    const cameraOptions: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(cameraOptions).then((imageData) => {
      console.log(imageData);
      this.cashColleted = !this.cashColleted;
      this.cashWithdrawal = !this.cashWithdrawal;
    })

   
   }
  ngOnInit() {
    if (this.cashWithdrawal) this.cashColleted = false;
    console.log(this.cashWithdrawal, this.cashColleted);
  }

}
