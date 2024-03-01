import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartStore } from '../cart.store';
import { Cart, LineItem } from '../models';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit {


  // TODO Task 3

  private fb = inject(FormBuilder)
  private cartStore = inject(CartStore)
  private productSvc = inject(ProductService);
  private route = inject(Router);
  
  protected form!:FormGroup
  lineItems!: LineItem[]
  total:number = 0
  orderResult$!:Promise<String>

  ngOnInit(): void {
    this.form = this.createForm();
    this.cartStore.getItems.subscribe(items=>{
      this.lineItems = items
    })

    this.total = this.getTotalPrice()

  }

  createForm():FormGroup
  {
    return this.fb.group(
      {
        name:this.fb.control<string>('',[Validators.required]),
        address:this.fb.control<string>('',[Validators.required,Validators.minLength(3)]),
        priority:this.fb.control<boolean>(false),
        comments:this.fb.control<string>('')
      }
    )
  }

  getTotalPrice():number
  { 
    var totalPrice = 0;
    for(var item of this.lineItems)
    {
      // console.log(item.price)
      totalPrice += item.price
    }
    return totalPrice
  }

  postOrder()
  { 
    console.log("Order:",this.form.value)
    console.log("LineItems:",this.lineItems)
    this.orderResult$=this.productSvc.checkout({...this.form.value,cart:this.lineItems})

    this.orderResult$.then(results=>{
      console.log(results)
      alert(JSON.stringify(results))
      this.route.navigate(['/']);
    }).catch(err=>
        alert(JSON.stringify(err)));
    
  }

  

  


}
