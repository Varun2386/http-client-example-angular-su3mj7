import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  visibleRowIndex: number = null;
  showCust: boolean = false;
  showAddr: boolean = false;
  constructor (private httpService: HttpClient) { }
  accountDetails: [];
  custData:any;
  labels:any;


  ngOnInit () {
    this.httpService.get('./assets/config.json').subscribe(
      (data:any) => {
        this.labels = JSON.stringify(data);
        this.labels = this.labels.replace(/\"custName\":/g, "\"Customer Name\":");
        this.labels = this.labels.replace(/\"dob\":/g, "\"Date of Birth\":");
        this.labels = this.labels.replace(/\"custAge\":/g, "\"Customer Age\":");
        this.labels = this.labels.replace(/\"custAddress\":/g, "\"Customer Address\":");
        this.labels = Object.keys(JSON.parse(this.labels));
        document.getElementById('ciResponseText').innerHTML = JSON.stringify(data.custAddress);
        this.custData = data;
        this.accountDetails = data.custAccounts;
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
}