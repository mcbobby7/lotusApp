import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.page.html',
  styleUrls: ['./withdrawal.page.scss'],
})
export class WithdrawalPage implements OnInit {

  constructor(
    private router: Router
  ) { }
  accountNo = ""
  ngOnInit() {
  }
  get disableSubmit(){
    return !(this.accountNo.length == 10 && Number(this.accountNo) > 0)
  }

  submit(){
    this.router.navigateByUrl('/withdrawal/amount')
  }

}