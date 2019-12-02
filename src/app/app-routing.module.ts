import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditComponent } from './component/add-edit/add-edit.component';
import { SearchPageComponent } from './component/search-page/search-page.component';


const routes: Routes = [{
  path : 'add',
  component : AddEditComponent
}, {
  path : '',
  component : SearchPageComponent
}, {
  path : 'edit',
  component : AddEditComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
