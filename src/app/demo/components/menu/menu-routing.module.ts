import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', loadChildren: () => import('./secondform/secondform.module').then((m) => m.SecondformModule) },
  ])],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
