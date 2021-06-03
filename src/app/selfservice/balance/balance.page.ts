import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Deposit, DepositService } from 'src/app/_services/deposit.service';
import { GlobalalertservicesService } from 'src/app/_services/globalalertservices.service';
import { IGetAccountDetailsResponse, LotusServiceProxy } from 'src/app/_services/service-proxies';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {
  depositObj: Deposit = {}
  customerAccountResp: IGetAccountDetailsResponse;
  constructor(private navCtrl: NavController,
    private depositService: DepositService, private activivatedroute: ActivatedRoute,
    private GalertService: GlobalalertservicesService,
    private AuthenService: AuthenticationService,
    private LotusService: LotusServiceProxy,private router: Router) { }
  ionViewWillEnter() {
    this.activivatedroute.queryParams.subscribe(data => {
      if (data) {
        if (data.accountNumber) {
          var acctNo = data.accountNumber;
          this.GalertService.gPresentLoading('Please wait...');
          this.AuthenService.getuser().then(userDetails => {
            this.LotusService.getAccountDetails(acctNo, userDetails[0].sessionToken,this.AuthenService.imei.value).subscribe((data) => {
              this.customerAccountResp = data.result;
              if (!data.hasError && this.customerAccountResp.body) {
                this.GalertService.gPresentToast(data.message, "success");

                let acctDet = this.customerAccountResp.body.find(x=>x.longAccount == acctNo);
            this.depositObj.singleDeposit = true;
            this.depositObj.bankName = "Lotus Bank";
                this.depositObj.accountName = acctDet.accountName;
                this.depositObj.accountNumber = acctDet.longAccount; 
                this.depositObj.bookbalance = acctDet.bookBalance;
                this.depositObj.balance = acctDet.accountBalance;
                this.depositObj.currencyCode = acctDet.currencyCode;
               }
              else {
                this.GalertService.gdismissLoading();
                this.router.navigate(['/selfservice/customeraccountlist'])
                this.GalertService.gPresentToast('Invalid Account Number', "danger");
              }
              this.GalertService.gdismissLoading();
            });
          });
    }
  }
    });


    this.depositService.get().subscribe((data:any) => {
      this.depositObj = data; 
      
    })
  }
  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back()
  }

}
