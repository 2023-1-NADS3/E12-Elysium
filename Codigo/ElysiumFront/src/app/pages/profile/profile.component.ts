import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Post } from 'src/app/_models/Post';
import { PostService } from 'src/app/_services/post.service';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLoggedIn: any
  user: any
  currentUser: any

  constructor(private authService: AuthService, private storageService: StorageService, private postService: PostService) { }

  ngOnInit(): void {
    this.findUser(id)
    this.isLoggedIn = this.storageService.isLoggedIn()
    this.currentUser = this.storageService.getUser().id
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