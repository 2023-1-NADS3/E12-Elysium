import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/_models/Post';
import { PostService } from 'src/app/_services/post.service';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-make-posts',
  templateUrl: './make-posts.component.html',
  styleUrls: ['./make-posts.component.css']
})
export class MakePostsComponent implements OnInit {
  submitted = false

  currentUser: any;
  isloged: any
  id: any

  post: Post = {
    title: '',
    desc: '',
    content: '',
    likes: 0,
    UserId: '',
  }

  constructor(private postService: PostService, private storageService: StorageService) { }
  
  ngOnInit(): void { 
    this.currentUser = this.storageService.getUser();
    this.isloged = this.storageService.isLoggedIn();
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
      error: (e) => console.error(e)
    })
  }

  newPost(): void{
    this.submitted = false
    this.post = {
      title: '',
      desc: '',
      content: '',
      likes: 0,
     }
  }

}
