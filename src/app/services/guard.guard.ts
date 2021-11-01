import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {



  constructor(private authService:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    return new Promise((resolve,reject)=>{
      this.authService.isAuth$.subscribe(
        (bool:boolean)=>{
          const isAuth=bool;
          if(isAuth){
            resolve(isAuth);
          }else{
            this.router.navigate(['/signin'])
            reject(isAuth);
          }
        }
      )
    });
  }

}
