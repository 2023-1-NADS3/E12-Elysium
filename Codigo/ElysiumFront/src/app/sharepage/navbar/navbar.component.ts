import { Component,OnInit,HostListener } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { AuthService } from '../../_services/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  
  isLoggedIn = false;
  username?: string;
  id: any
  

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
      this.id = this.storageService.getUser().id
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();
        this.router.navigate([""])
      },
      error: err => {
        console.log(err);
      }
    });
  }


  nav_variable=false;
  @HostListener("document:scroll")
  scrollfunction(){
    if(document.body.scrollTop > 0 ||document.documentElement.scrollTop >10){
      this.nav_variable=true;
    }
    else{
      this.nav_variable=false;
    }
  }
}


