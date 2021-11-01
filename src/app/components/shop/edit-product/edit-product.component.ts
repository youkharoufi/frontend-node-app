import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import {Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'node-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productForm:FormGroup;
  errorMessage:string;
  imagePreview:string;
  loading:boolean;
  userId:string;
  product:Product;

  constructor(private formBuilder:FormBuilder,private authService:AuthService,private productService:ProductService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.userId=this.authService.userId;
    this.loading=true;
    this.route.params.subscribe(
      (params:Params)=>{
        this.productService.getProductById(params.id)
        .then((product:Product)=>{
          this.product=product;
          if(this.product.userId!==this.userId){
            console.log("You can't edit this product !");
            this.router.navigate(["/not-found"])
          }
          this.productForm=this.formBuilder.group({
            name:[product.name,Validators.required],
            description:[product.description,Validators.required],
            price:[product.price/100,Validators.required],
            stock:[product.stock,Validators.required],
            image:[product.image,Validators.required],
          });
          this.imagePreview=product.image;
          this.loading=false;
          })
          .catch((err)=>{
            console.log(err.message);
            return this.router.navigate(['/shop']);

          })
      }
    )
  }

  onSubmit(){
    this.loading=true;
    const product:Product=new Product();

    if(this.product.userId!==this.userId){
      console.log("You can't edit this product !");
      this.router.navigate(["/not-found"])
    }

    product._id=this.product._id;
    product.name=this.productForm.get('name').value;
    product.description=this.productForm.get('description').value;
    product.price=this.productForm.get('price').value*100;
    product.stock=this.productForm.get('stock').value;
    product.image='';
    product.userId=this.userId;

    //Save Updated Product

    this.productService.updateProduct(product._id,product,this.productForm.get('image').value)
    .then(()=>{
      this.productForm.reset();
      this.loading=false;
      this.router.navigate(['/shop'])
    }).catch((error)=>{
      this.loading=false;
      this.errorMessage=error.massage;
    })


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
