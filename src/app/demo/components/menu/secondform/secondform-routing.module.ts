import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecondformComponent } from './secondform.component';

const routes: Routes = [{ path: '', component: SecondformComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecondformRoutingModule { }
