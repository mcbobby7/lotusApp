import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfertype',
  templateUrl: './transfertype.page.html',
  styleUrls: ['./transfertype.page.scss'],
})
export class TransfertypePage implements OnInit {

  constructor(private router: Router) { }
  gotolocaltrf(){
    this.router.navigate(['localtransfertype'])
  }
  gotoIntl(){
    this.router.navigate([''])
  }
  ngOnInit() {
  }

}
