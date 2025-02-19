import { Component, Input, OnInit, Output, inject, input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LineItem} from '../models';
import { CartStore } from '../cart.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {

  // NOTE: you are free to modify this component

  private fb = inject(FormBuilder)
  private cartStore = inject(CartStore)

  @Input({ required: true })
  productId!: string

  @Input({})
  productName!:string

  @Input()
  productPrice!:number


  form!: FormGroup

  protected Cart$!: Observable<LineItem[]>

  ngOnInit(): void {
    this.form = this.createForm()
    this.Cart$ = this.cartStore.getItems;
  }

  addToCart() {
    const lineItem: LineItem = {
      prodId: this.productId,
      quantity: this.form.value['quantity'],
      name: this.productName,
      price: this.productPrice * this.form.value['quantity']
    }
    console.log(lineItem)
    this.cartStore.addItem(lineItem);
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      quantity: this.fb.control<number>(1, [ Validators.required, Validators.min(1) ])
    })
  }



}
