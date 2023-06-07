import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/_models/Post';
import { PostService } from 'src/app/_services/post.service';
import { StorageService } from '../../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-make-posts',
  templateUrl: './make-posts.component.html',
  styleUrls: ['./make-posts.component.css']
})
export class MakePostsComponent implements OnInit {
  submitted = false

  currentUser: any;
  isloged = false
  id: any
  erroT = ''
  erroD = ''
  erroC = ''
  erroM = ''
    
  post: Post = {
    title: '',
    desc: '',
    content: '',
    likes: 0,
    createdAt: '',
    UserId: '',
  }

  constructor(private router: Router,private postService: PostService, private storageService: StorageService) { }
  
  ngOnInit(): void { 
    this.currentUser = this.storageService.getUser();
    this.isloged = this.storageService.isLoggedIn();
    if (!this.isloged) { 
    this.redirectToLogin()
    }
    this.id = this.currentUser.id
  }

  savePost(): void{
    const data = {
      title: this.post.title,
      desc: this.post.desc,
      content: this.post.content,
      UserId: this.id
    }

    this.postService.create(data).subscribe({
      next: (res) => {
        console.log(res)
        this.submitted = true;
      },
      error: err => {
        this.erroM = err.error.message;
      }
    })
  }

  newPost(): void{
    this.submitted = false
    this.post = {
      title: '',
      desc: '',
      content: '',
      likes: 0,
      createdAt: ''
     }
  }

  posts() {
    this.router.navigate(['/posts'])
  }
    redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
