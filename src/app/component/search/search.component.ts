import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Orders } from 'src/app/models/orders';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  myForm: FormGroup;

  @Output()
  customerList = new EventEmitter();
  productList: Product[];
  constructor(private proService: ProductService , private router: Router) { }
  productSelect: Product;
  // // firstName: string;
  // lastName: string;
  // email: string;

  ngOnInit() {
    this.proService.getProductApi().subscribe( productList => {
      this.productList = productList;
      console.log(this.productList);
    });
    this.myForm = new FormGroup({
      firstName : new FormControl(''),
      lastName : new FormControl(''),
      email: new FormControl(''),
      product: new FormControl(''),
    });
  }

  onSubmit(form: FormGroup) {
    let data = form.getRawValue();
    data = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      productId: data.product.productId
    };
    this.customerList.emit(data);
  }
  addClick() {
    this.proService.selectedOrders = null;
    this.router.navigate(['/add']);
  }
}
