import { Component } from '@angular/core';
import { Post } from 'src/app/_models/Post';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  post?: Post[]
  currentPost: Post = {
    likes:0
  }
  currentIndex = -1
  like = 1
  title = ''


  constructor(private postService: PostService) { }
  
  ngOnInit(): void{
    this.retrivePosts()
  }

  retrivePosts(): void{
    this.postService.getAll().subscribe({
      next: (data) => {
        this.post = data
        console.log(data)
      },
      error: (e) => console.log(e)
    })
  }

  refreshList(): void{
    this.retrivePosts()
    this.currentPost = {
         likes:0
    }
    this.currentIndex = -1
  }

  updateLike(): void{

      const data = {
      likes: this.currentPost.likes,
      
      }
    
    this.postService.update(this.currentPost.id,  data).subscribe({
      next: (res) => {
        console.log(res)
        this.currentPost.likes++
      },
       error: (e) => console.error(e)
    })

  }

  setActivePost(post: Post, index: number): void{
    this.currentPost = post
    this.currentIndex = index
  }

  searchPost(): void{
    this.currentPost = {
         likes:0
    }
    this.currentIndex = -1

    this.postService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.post = data
        console.log(data)
      },
      error: (e) => console.log(e)

    })
  }
}
