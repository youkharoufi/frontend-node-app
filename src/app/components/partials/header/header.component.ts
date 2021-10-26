import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'node-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.isAuth$.subscribe(
      (bool:boolean)=>{
          this.isAuth=bool
      }
    )
  }

  logout(){
    this.authService.logout();
  }

}
