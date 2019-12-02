import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { Orders } from 'src/app/models/orders';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import {MessageService} from 'primeng/api';

@Component ({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  addForm: FormGroup;
  productList: Product[];
  customerList: Customer[];
  currentDate = new Date();

  oId: number;

  constructor( private proService: ProductService, private router: Router, private http: HttpClient, private messageService: MessageService ) { }
  ngOnInit() {

    this.proService.getProductApi().subscribe( productList => {
      this.productList = productList.map( prod => {
        return { productName: prod.productName, productId: prod.productId, price: prod.price, productDesc: null, active: null};
      });
      console.log('pList ', this.productList);
    });
    this.proService.getCustomerApi().subscribe( customerList => {
      this.customerList = customerList.map( prod => {
        return { customerId: prod.customerId, fullName: prod.fullName, tel: null, address: null, email: null};
      });
      console.log('cList' , this.customerList);
    });

    this.addForm = new FormGroup({
      orderId: new FormControl(''),
      orderDate: new FormControl(''),
      product: new FormControl('', Validators.required),
      customer: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      total: new FormControl(''),
      status : new FormControl('true')
    });

    const formPathch = this.proService.selectedOrders;
    if (formPathch) {
    // this.oId = this.proService.orId;
    this.proService.orderApi(this.proService.selectedOrders).subscribe( data => {
      this.addForm.patchValue({
            ...data,
            orderDate: new Date(data.orderDate),
            productId: data.product,
            customerId: data.customer,
            amount: data.amount,
            total: data.total,
            status: (data.status) === 'Y' ? true : false,
          });
      console.log('----------------------------------- ', data);
    });
  }
    // if (selectedOrders) {
    //   this.addForm.patchValue({
    //     ...selectedOrders,
    //     orderDate: selectedOrders.orderDate,
    //     productId: selectedOrders.product.productId,
    //     customerId: selectedOrders.customer.customerId,
    //     amount: selectedOrders.amount,
    //     total: selectedOrders.total
    //   });
    // }
  }
  onSubmit(form: FormGroup) {
    console.log('form ', form.getRawValue());
    if (form.valid) {
      let data = form.getRawValue();
      console.log(form.getRawValue());
      if (data.orderId) {
        data = {
          orderId: data.orderId,
          orderDate: (data.orderDate).toISOString(),
          product: {productId: data.product.productId},
          customer: {customerId: data.customer.customerId},
          amount: data.amount,
          status : (data.status) === true ? 'Y' : 'N'
        }
        console.log('edit' + data.orderDate);
        this.proService.editOrdersApi(data).subscribe();
        this.messageService.add({severity: 'success', summary: 'ดำเนินการเสร็จสิ้น', detail: 'แก้ไข้อมูลเสร็จสิ้น'});
      } else {
        data = {
          orderDate: data.orderDate.toISOString(),
          product: {productId: data.product.productId},
          customer: {customerId: data.customer.customerId},
          amount: data.amount,
          status : 'Y'
        }
        console.log('add ' + data.orderDate);
        this.proService.addOrdersApi(data).subscribe();
        this.messageService.add({severity: 'success', summary: 'ดำเนินการเสร็จสิ้น', detail: 'บันทึกข้อมูลเสร็จสิ้น'});
      }
    }
    // let data = form.getRawValue();
    // data = {
    //   orderDate: data.orderDate,
    //   productId: data.product.productId,
    //   customerId: data.customer.customerId,
    //   amount: data.amount,
    //   total: data.total
    // };
    // console.log(data);
    // console.log(this.orderDate);
  }

  onReset(){
    this.addForm.patchValue({
      orderDate: '',
      product: '',
      customer: '',
      amount: '',
      total: '',
      status: '',
    });
  }

  backClick() {
    this.router.navigate(['']);
  }

}
