import { Component, OnInit,OnDestroy } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {Subscription} from "rxjs";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'node-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit,OnDestroy {

  products:Product[];
  productSub:Subscription;
  userId;
  loading:boolean;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productSub=this.productService.product$.subscribe(
      (products:Product[])=>{
        this.loading=true;
        this.products=products;
      },
      (err)=>{
        this.loading=false;
        console.log(err);
      }
    );
    this.productService.getProducts();
  }

  ngOnDestroy():void{
    this.productSub.unsubscribe();
  }

}
