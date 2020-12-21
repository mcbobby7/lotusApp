import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FundTransfer, TransferService } from 'src/app/_services/transfer.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {

  transfer: FundTransfer = {}
  constructor(
    private router: Router,
    private fundTransferService: TransferService
  ) { }
  gototransfer(){
this.router.navigate(['fundtransfer'])
  }
  ionViewWillEnter(){
    this.fundTransferService.get().subscribe(data => this.transfer = data)
  }
  ngOnInit() {
   
  }
  goBack(){
    this.router.navigate(['dashbord'])
  }
}
