import { Component, OnInit } from '@angular/core';
import { FundTransfer, TransferService } from 'src/app/_services/transfer.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {

  transfer: FundTransfer = {}
  constructor(
    private fundTransferService: TransferService
  ) { }

  ngOnInit() {
    this.fundTransferService.get().subscribe(data => this.transfer = data)
  }

}
