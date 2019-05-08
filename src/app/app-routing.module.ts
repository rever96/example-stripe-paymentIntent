import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './Payment/Payment.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'payment'
  },
  {
    path: 'payment',
    component: PaymentComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
