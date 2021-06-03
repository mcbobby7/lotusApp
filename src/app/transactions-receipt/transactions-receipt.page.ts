import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-receipt',
  templateUrl: './transactions-receipt.page.html',
  styleUrls: ['./transactions-receipt.page.scss'],
})
export class TransactionsReceiptPage implements OnInit {
  tdate: Date = new Date();
  constructor() { }

  ngOnInit() {
  }

}
