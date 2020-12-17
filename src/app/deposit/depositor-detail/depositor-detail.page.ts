import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Deposit, DepositService } from 'src/app/_services/deposit.service';

@Component({
  selector: 'app-depositor-detail',
  templateUrl: './depositor-detail.page.html',
  styleUrls: ['./depositor-detail.page.scss'],
})
export class DepositorDetailPage implements OnInit {
  depositObj: Deposit = {}

  depositorForm = new FormGroup({
    depositorFullname: new FormControl(''),
    depositorPhoneNumber: new FormControl(''),
    depositorEmail: new FormControl(''),
    narration: new FormControl(''),
  });

  constructor(
    private activatedroute: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private depositService: DepositService
  ) { }

  validate(){
    
  }

  submit(){
    // console.log(this.depositObj)
    this.depositService.store(this.depositObj)
    this.router.navigateByUrl('/deposit/confirm', {queryParams: JSON.parse})
  }

  ngOnInit() {
    this.depositService.get().subscribe((data: any) => {
      this.depositObj = {...data}
    })
  }
  getdepositdetails() {
    this.activatedroute.queryParams.subscribe(data => {
      console.log(data)
      if (data.depositDetails) {
        this.depositObj = JSON.parse(data.depositDetails);
        console.log(this.depositObj)
        console.log(JSON.parse(data.depositDetails))
      }
    })
  }
  goBack() {
    this.navCtrl.back()
  }

}
