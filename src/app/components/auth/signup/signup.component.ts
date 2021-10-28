import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service'

@Component({
  selector: 'node-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  errorMessage:string;
  cleanMessage:string;
  loading:boolean;

  constructor(private formBuilder:FormBuilder,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      email:this.formBuilder.control("",[Validators.email,Validators.required]),
      password:[null,Validators.required]
    })
  }

  onSubmit(){
    const email=this.signupForm.get('email')?.value;
    const password=this.signupForm.get('password')?.value;
    this.loading=true;
    this.authService.signup(email,password).then(()=>{this.loading=false;this.router.navigate(["/shop"])}).catch((error)=>{this.loading=false;this.errorMessage=error.message})
  }

}
