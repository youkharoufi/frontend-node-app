import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "src/environments/environment"
import { BehaviorSubject } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api=environment.api;
  token;
  userId;
  isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient:HttpClient) {
    this.initAuth();
   }

  initAuth(){
    if(typeof localStorage !== "undefined"){
    const data = JSON.parse(localStorage.getItem('auth')!);
   if(data){
    if(data.userId && data.token){
      this.userId = data.userId;
      this.token = data.token;
      this.isAuth$.next(true)
    }
  }
  }
  }

  signup(email:string,password:string){
      return new Promise((resolve,reject)=>{
        this.httpClient.post<{ status: Number, message: string }>(this.api+'/users/signup',{email:email,password:password}).subscribe(
          (signupData:{status:Number,message:string})=>{
              //authentifier user
              if(signupData.status===201){
                this.signin(email,password).then(()=>{resolve(signupData.message)}).catch((err)=>{reject(err)});
              }else{
                reject(signupData.message);
              }
          },
          (err)=>{
            reject(err);
          },
        )
      })
  }

  signin(email:string,password:string){
    return new Promise((resolve,reject)=>{
      this.httpClient.post<{token:string,userId:string}>(this.api+"/users/login",{email:email,password:password}).subscribe(
        (authData:{token:string,userId:string})=>{
          this.token=authData.token;
          this.userId=authData.userId;
          this.isAuth$.next(true);
          //save authData in local
          if(typeof localStorage !== "undefined"){
            localStorage.setItem('auth',JSON.stringify(authData));
          }
          console.log(authData);
          resolve(true);

        },
        (err)=>{
          reject(err);
        }
      )
    })
  }

  logout(){
    this.isAuth$.next(false);
    this.userId=null;
    this.token=null;

    if(typeof localStorage!=="undefined"){
      localStorage.setItem('auth',null!)
    }
  }
}
