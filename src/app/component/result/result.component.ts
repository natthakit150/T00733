import { Component, OnInit, Input } from '@angular/core';
import { Orders } from 'src/app/models/orders';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input()
  customerList: Orders[] = [];
  constructor(public proService: ProductService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
  }

  goToDelete(id, row) {
    this.proService.deleteOrders(id).subscribe();
    this.proService.customerList.splice(row, id);
    this.messageService.add({severity: 'success', summary: 'ดำเนินการเสร็จสิ้น', detail: 'ลบข้อมูลเสร็จสิ้น'});
  }

  editClick(row) {
    this.proService.selectedOrders = row;
    console.log(row);
    this.router.navigate(['/edit']);
  }

}
