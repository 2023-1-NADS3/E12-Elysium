import { Component } from '@angular/core';
import { Post } from 'src/app/_models/Post';
import { PostService } from 'src/app/_services/post.service';
import { StorageService } from '../../_services/storage.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  likedPosts: number[] = [];
  post?: Post[]
  currentPost: Post = {
    title: '',
    desc: '',
    content: '',
    likes: 0,
    createdAt: ''
  }
  currentIndex = -1
  title = ''
  isLoggedIn = false;
  user: any

  constructor(private postService: PostService,
    private storageService: StorageService,
    private router: Router,
  ) { }
  
  ngOnInit(): void{
    this.retrivePosts()
    this.isLoggedIn = this.storageService.isLoggedIn()
    this.user = this.storageService.getUser().id
  }

  retrivePosts(): void{
    this.postService.getAll().subscribe({
      next: (data) => {
        this.post = data.map(post => {
          const formattedDate = formatDate(post.createdAt, 'dd/MM/yyyy', 'en-US')
          return {...post, createdAt: formattedDate}
        })
      },
      error: (e) => console.log(e)
    })
  }

  deletePost(idPost: any, idCriador: any): void{
    if(idCriador == this.user){
    this.postService.delete(idPost)
      .subscribe({
        next: (res) => {
          console.log(res)
          window.location.reload()
        },
        error: (e) => console.error(e)
      })
    }
    else {
      window.alert('Você não tem permissão para excluir este post.');
    }
  } 

  
updateLike(idButton: any, likes: number): void {
  if (!this.likedPosts.includes(idButton)) {
    likes++;

    const data = {
      likes: likes
    };

    this.postService.update(idButton, data).subscribe({
      next: (res) => {
        console.log(res);
        const updatedPost = this.post?.find(p => p.id === idButton);
        if (updatedPost) {
          updatedPost.likes = likes;
        }
      },
      error: (e) => console.error(e)
    });

    this.likedPosts.push(idButton);
  }
}

  searchPost(): void{
    this.currentPost = {
    title: '',
    desc: '',
    content: '',
      likes: 0,
    createdAt:''
    }
    this.currentIndex = -1

    this.postService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.post = data.map(post => {
          const formattedDate = formatDate(post.createdAt, 'dd/MM/yyyy', 'en-US')
          return {...post, createdAt: formattedDate}
        })
        console.log(data)
      },
      error: (e) => console.log(e)

    })
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}



