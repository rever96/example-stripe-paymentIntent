import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './Payment.component.html'
})
export class PaymentComponent implements OnInit {
  userData: any;
  paymentIntentID: string;

  constructor(
    private http: HttpClient) {
  }
  ngOnInit() {
    this.http.post('http://localhost:8080/createPayment', {}).subscribe(res => {
      console.log('back from server!');
      console.log(res);
      // tslint:disable-next-line: no-string-literal
      this.paymentIntentID = res['id'];
    });
  }

  submitPaymentData() {
    console.log('confirm payment');
    this.http.post('http://localhost:8080/confirmPayment', { id: this.paymentIntentID }).subscribe(res => {
      console.log('back from server!');
      console.log(res);
    });
  }
}
