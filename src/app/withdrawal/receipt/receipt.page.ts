import { Component, OnInit } from '@angular/core';
import { Withdrawal, WithdrawalService } from 'src/app/_services/withdrawal.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {

  withdrawal: Withdrawal = {}
  constructor(
    private withdrawalService: WithdrawalService
  ) { }

  ngOnInit() {
    this.withdrawalService.get().subscribe(data => this.withdrawal = data)
  }

}
