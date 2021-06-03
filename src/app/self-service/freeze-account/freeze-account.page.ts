import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GlobalalertservicesService } from 'src/app/_services/globalalertservices.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { LotusServiceProxy,FreezeAccountPayload,FreezeAccountPayloadBody } from 'src/app/_services/service-proxies';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';

@Component({
  selector: 'app-freeze-account',
  templateUrl: './freeze-account.page.html',
  styleUrls: ['./freeze-account.page.scss'],
})
export class FreezeAccountPage implements OnInit {
  freezeForm: FormGroup;
  showProcessing: boolean = false;
  FreezeAccount = new FreezeAccountPayload().clone();
  bodyFreezeAccount = new  FreezeAccountPayloadBody().clone()
  constructor(private navCtrl: NavController,
    private AuthenService: AuthenticationService,
    public inpVali: InputvalidationService,
    private lotusService: LotusServiceProxy,
    private shortcutService: ShortcutsService,
    private GalertService: GlobalalertservicesService,) { }
  goBack() {
    this.navCtrl.back()
  }
  statementRequest() {
    this.showProcessing = true;
    this.AuthenService.getuser().then(userData => {
      if (userData) {
        if (userData.length > 0) {
          this.bodyFreezeAccount.freezeAccount = this.bodyFreezeAccount.accountNo;
          this.bodyFreezeAccount.shortName = userData[0].fullName;
          this.bodyFreezeAccount.freezeAccount = "YES";
          this.FreezeAccount.body = this.bodyFreezeAccount;
          this.lotusService.freezeAccount(this.FreezeAccount, userData[0].sessionToken,this.AuthenService.imei.value).subscribe(data => {
            this.showProcessing = false;
            if (!data.hasError) {
              this.FreezeAccount =  new FreezeAccountPayload().clone();
                this.GalertService.gPresentToast(data.message, "success");
              }
            else {
              this.shortcutService.showErrorToast("Oops! Error occured while processing freeze request")
            }
        })
         }
      }
     
     })

}
  ngOnInit() {
  }

}
