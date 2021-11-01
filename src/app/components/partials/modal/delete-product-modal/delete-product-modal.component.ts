import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Product} from '../../../../models/product'
import { ProductService } from 'src/app/services/product.service';
import {Input} from "@angular/core";
import {ActivatedRoute,Params,Router} from "@angular/router";


@Component({
  selector: 'node-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css']
})
export class DeleteProductModalComponent implements OnInit {

  @Input() product:Product;
  userId:string;

  constructor(private authService:AuthService,private productService:ProductService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.userId=this.authService.userId;
  }

  deleteProduct(product:Product){
    if(this.userId!==product.userId){
      this.router.navigate(['/not-found'])
    }

        this.productService.deleteProduct(product._id)
        .then(()=>{console.log("Product deleted")})
        .catch(()=>{
         this.router.navigate(['/shop'])
        })
      }

  }


