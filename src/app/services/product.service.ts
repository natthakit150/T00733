import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { tap } from 'rxjs/operators';
import { Orders } from '../models/orders';
import { Customer } from '../models/customer';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  selectedOrders: Orders;
  customerList: Orders[] = [];
  orId: number;
  constructor(private http: HttpClient) { }

  removeEmpty(obj) {
    Object.keys(obj).forEach(key => (obj[key] == null || obj[key] == '') && delete obj[key]);
  }
  getOrders(condition: any) {
    this.removeEmpty(condition);
    const params = new HttpParams({ fromObject: condition });
    return this.http
      .get<Orders[]>('/workshop-api/api/orders/queryOrderByCondition/', {
        params
      })
      .pipe(
        tap(response => {
          this.customerList = response;
        })
      );
  }
  getProductApi() {
    return this.http.get<Product[]>('/workshop-api/api/product');
  }

  getCustomerApi() {
    return this.http.get<Customer[]>('/workshop-api/api/customer');
  }

  deleteOrders(id) {
    return this.http.delete<any>('/workshop-api/api/orders/' + id);
  }
  addOrdersApi(payload: Orders) {
    return this.http.post<Orders>('/workshop-api/api/orders', payload);
  }
  editOrdersApi(payload: Orders) {
    return this.http.put<Orders>('/workshop-api/api/orders', payload);
  }
  orderApi(id){
    return this.http.get<Orders>('/workshop-api/api/orders/' + id);
  }
}
