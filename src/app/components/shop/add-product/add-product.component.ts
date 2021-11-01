import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import {AuthService} from '../../../services/auth.service';
import {ProductService} from '../../../services/product.service';
import {Router} from "@angular/router";
@Component({
  selector: 'node-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm:FormGroup;
  errorMessage:string;
  imagePreview:string;
  loading:boolean;
  userId:string;

  constructor( private formBuilder:FormBuilder,private authService:AuthService,private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      name:[null,Validators.required],
      description:[null,Validators.required],
      stock:[2,Validators.required],
      price:[0,Validators.required],
      image:[null,Validators.required]
    });
    this.userId=this.authService.userId;
  }

  onSubmit(){
    this.loading=true;
    const product:Product=new Product();
    product.name=this.productForm.get('name').value;
    product.description=this.productForm.get('description').value;
    product.price=this.productForm.get('price').value;
    product.stock=this.productForm.get('stock').value;
    product.image='';
    product.userId=this.userId;
    //save product
    this.productService.createNewProduct(product,this.productForm.get('image').value).then(()=>{this.productForm.reset();this.loading=false;this.router.navigate(['/shop'])}).catch((err)=>{this.errorMessage=err.message;this.loading=false;})
  }

  onImagePick(event:Event){
    const file=(event.target as HTMLInputElement).files![0];
    this.productForm.get('image')?.patchValue(file);
    this.productForm.get('image')?.updateValueAndValidity();

    const reader=new FileReader();
    reader.onload=()=>{
      if(this.productForm.get('image')?.valid){
        this.imagePreview=reader.result as string;
      }else{
        this.imagePreview=null;
      }
    }
    reader.readAsDataURL(file);

  }

}
