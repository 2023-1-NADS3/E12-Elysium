import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/_models/Post';
import { PostService } from 'src/app/_services/post.service';
import { Coments } from 'src/app/_models/Coments';
import { ComentsService } from 'src/app/_services/coments.service';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const index = 0

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit{

    
  currentPost: Post = {
    title: '',
    content: '',
    likes: 0,
  }

  index = this.currentPost.Users?.username


  coments: Coments = {
    coment: '',
    likes: 0,
  }

  like = 1
    
  constructor(private postService: PostService,
              private comentService: ComentsService,
              ) { }
  
  ngOnInit(): void {
    this.getPost(id);
  }


  retriveComents(): void{
    
  }

  getPost(id: any): void{
    this.postService.get(id).subscribe({
      next: (data) => {
        this.currentPost = data
        console.log(data)
      },
      error: (e) => console.error(e)
    })
  }

  likePost(): void{
    const data = {
      likes: this.currentPost.likes
    }
    this.postService.update(this.currentPost.id, data).subscribe({
      next: (res) => {
        console.log(res)
        this.currentPost.likes = this.like++
      },
       error: (e) => console.error(e)
    })

  }

  deletePost() { }
  
  updatePost() { }

  

  saveComent(): void{
    const data = {
      coment: this.coments.coment
    }

    this.comentService.createComent(data).subscribe({
      next: (res) => { 
        console.log(res)
      },
      error: (e) => console.error(e)
    })

   }

  updateComent() { }

  deleteComent() { }

  likeComent(){ }
}
