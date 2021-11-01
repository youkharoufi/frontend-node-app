import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {Product} from '../models/product';
import {Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Data} from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api=environment.api;
  products:Product[];
  product$=new Subject<Product[]>()

  constructor(private httpClient:HttpClient) { }

  getProducts(){
    this.httpClient.get<Data>(this.api+"/products").subscribe(
      (data:Data)=>{
          if(data.status===200){
            this.products=data.result;
            this.emitProduct();
          }else{
            console.log(data)
          }
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  emitProduct(){
    this.product$.next(this.products);
  }

  getProductById(id:string){
    return new Promise<any>((resolve,reject)=>{
        this.httpClient.get<Data>(this.api+"/products/"+id).subscribe(
          (data:Data)=>{
            if(data.status===200){
              resolve(data.result);
            }else{
              reject(data.message);
            }
          },
          (error)=>{
            reject(error);
          }
        )
    })
  }

  createNewProduct(product:Product,image:File){
    return new Promise((resolve,reject)=>{
      let productData:FormData=new FormData();
      productData.append('product',JSON.stringify(product));
      productData.append('image',image);

      this.httpClient.post<Data>(this.api+"/products",productData).subscribe(
        (data:Data)=>{
          if(data.status===200){
            this.getProducts();
            resolve(data);
        }else{
          reject(data.message);
        }
      },
        (error)=>{
          reject(error);
        }
      )
    })
  }

  updateProduct(id:string,product:Product,image:File|string){
    return new Promise((resolve,reject)=>{
      let productData:FormData=new FormData();

      if(typeof image === 'string'){
        product.image=image;
      }else{
        productData.append('image', image);
      }
      productData.append('product',JSON.stringify(product));

      this.httpClient.put<Data>(this.api+"/products/"+id, productData).subscribe(
        (data:Data)=>{
          if(data.status===200){
            resolve(data)
          }else{
            reject(data);
          }
        },
        (error)=>{
          reject(error);
        }
      )
    })
  }

  deleteProduct(id:string){
    return new Promise((resolve,reject)=>{
      this.httpClient.delete<Data>(this.api+"/products/"+id).subscribe(
        (data:Data)=>{
          this.getProducts();
          resolve(data);
        },
        (error)=>{
          reject(error);
        }
      )
    })
  }
}
