import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Orders } from 'src/app/models/orders';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  customerList: Orders[] = [];
  constructor(private pdService: ProductService) { }

  ngOnInit() {
  }
  cus(event) {
    this.pdService.removeEmpty(event);
    this.pdService.customerList.push(event);
    this.pdService.getOrders(event).subscribe(data => {
      console.log(data);
    });
  }

}
