import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GlobalalertservicesService } from 'src/app/_services/globalalertservices.service';
import { InputvalidationService } from 'src/app/_services/inputvalidation.service';
import { IUser, LotusServiceProxy,GetAccountStatementPayload, GetAccountStatementResponseBody } from 'src/app/_services/service-proxies';
import { ShortcutsService } from 'src/app/_services/shortcuts.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-generatestatement',
  templateUrl: './generatestatement.page.html',
  styleUrls: ['./generatestatement.page.scss'],
})
export class GeneratestatementPage implements OnInit {
  statementForm: FormGroup;
  user: IUser;
  accountNo = "";
  fromDate = new Date();
  toDate = new Date();
  SendStatementToEmail: boolean = false;
  GetAccountStatement = new GetAccountStatementPayload().clone();
  showProcessing: boolean = false;
  statementBody: GetAccountStatementResponseBody[] = [];
  tdate: Date = new Date();
  constructor(private navCtrl: NavController,
    private AuthenService: AuthenticationService,
    public inpVali: InputvalidationService,
    private lotusService: LotusServiceProxy,
    private shortcutService: ShortcutsService,
    private GalertService: GlobalalertservicesService,
    private storage: Storage,
  private router: Router) { }
  ionViewWillEnter() {
    this.AuthenService.getuser().then(userData => {
      if (userData) {
        if (userData.length > 0) {
          this.user = userData[0];
         }
      }
     
     })
  }
  statementRequest() {
    this.showProcessing = true;
    this.GetAccountStatement.startdate = new Date(this.GetAccountStatement.startdate);
    this.GetAccountStatement.enddate = new Date(this.GetAccountStatement.enddate);
    this.lotusService.getAccountStatement(this.GetAccountStatement, this.user.sessionToken,this.AuthenService.imei.value).subscribe(data => {
      this.showProcessing = false;
      if (!data.hasError) {       
        if (this.GetAccountStatement.sendStatementToEmail) {
          this.GalertService.gPresentToast("Statement Sent", "success");    
        } else {          
          this.GalertService.gPresentToast(data.message, "success");
          this.statementBody = data.result.body;         
        }
      } else {

        this.shortcutService.showErrorToast(data.result.error.message)
      }
  })
}

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }

}
