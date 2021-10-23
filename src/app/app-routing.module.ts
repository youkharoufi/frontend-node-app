import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './components/auth/signup/signup.component';
import {SigninComponent} from './components/auth/signin/signin.component';
import {ShopComponent} from "./components/shop/shop.component";
import {AddProductComponent} from './components/shop/add-product/add-product.component';
import {SingleProductComponent} from './components/shop/single-product/single-product.component';
import {EditProductComponent} from './components/shop/edit-product/edit-product.component';
import {CartComponent} from "./components/shop/cart/cart.component";
import {NotFoundComponent} from './components/partials/not-found/not-found.component';


const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:"signin",component:SigninComponent},
  {path:"shop",component:ShopComponent},
  {path:"add-product",component:AddProductComponent},
  {path:"single-product/:id",component:SingleProductComponent},
  {path:"edit-product/:id",component:EditProductComponent},
  {path:"cart",component:CartComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
