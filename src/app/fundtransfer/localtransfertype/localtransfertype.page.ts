import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-localtransfertype',
  templateUrl: './localtransfertype.page.html',
  styleUrls: ['./localtransfertype.page.scss'],
})
export class LocaltransfertypePage implements OnInit {

  constructor(private router: Router) { }
  gotolocaltrf(trftype){
this.router.navigate(['fundtransfer/amount'],{queryParams:{trftype: trftype}})
  }
  ngOnInit() {
  }

}
