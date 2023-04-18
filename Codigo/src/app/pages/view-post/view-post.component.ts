import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/_models/Post';
import { PostService } from 'src/app/_services/post.service';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit{

  currentPost: Post = {
    title: '',
    desc: '',
    content: '',
    likes: 0
  }

  constructor(private postService: PostService) { }
  
  ngOnInit(): void {
      this.getPost(id);
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

}
