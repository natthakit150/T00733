import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import { SearchPageComponent } from './search-page.component';
import { SearchComponent } from '../search/search.component';
import { ResultComponent } from '../result/result.component';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';



@NgModule({
  declarations: [SearchPageComponent, SearchComponent, ResultComponent],
  imports: [
    CommonModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    ToastModule
  ],
  exports: [SearchPageComponent]
})
export class SearchPageModule { }
