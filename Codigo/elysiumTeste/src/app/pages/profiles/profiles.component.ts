import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { AuthService } from 'src/app/_services/auth.service';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  currentUser: any;
  isloged: any
  user: any

  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isloged = this.storageService.isLoggedIn();
    this.findUser(id)
  }

  findUser(id: any): void {
    this.authService.findUser(id).subscribe({
      next: (data) => {
        this.user = data
        console.log(data)
      },
      error: (e) => console.error(e)
    })
  }

}