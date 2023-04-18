import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/_models/Post';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-make-posts',
  templateUrl: './make-posts.component.html',
  styleUrls: ['./make-posts.component.css']
})
export class MakePostsComponent implements OnInit {
  post: Post = {
    title: '',
    desc: '',
    content: '',
  }
  submitted = false

  constructor(private postService: PostService) { }
  
  ngOnInit(): void { }

  savePost(): void{
    const data = {
      title: this.post.title,
      desc: this.post.desc,
      content: this.post.content
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
     }
  }

}
