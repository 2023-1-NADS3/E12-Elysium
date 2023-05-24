import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/_models/Post';
import { PostService } from 'src/app/_services/post.service';
import { Coments } from 'src/app/_models/Coments';
import { ComentsService } from 'src/app/_services/coments.service';
import { StorageService } from 'src/app/_services/storage.service';
import { Router } from '@angular/router';


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit{  
  coments?: Coments[]

  currentCom: Coments = {
    id: 0,
    coment: '',
    like: 0,
    createdAt: '',
    updatedAt: '',
    user: {
      id: 0,
      username: '',
    },
    post: {
      id: 0,
    }
  }
    
  currentPost: Post = {
    title: '',
    desc: '',
    content: '',
    likes: 0,
    usernames: '',
    UserId: 0
  }

  commentClicked = false;

  UserId: any
  PostId: any
  isLoggedIn = false;
  comenta: string = ''
  comentario: string = ''
  erroM = ''
  like = 1
    
  constructor(private postService: PostService,
              private comentService: ComentsService,
              private storageService: StorageService,
              private router: Router
  ) { }
  
  ngOnInit(): void {
    this.getPost(id);
    this.retriveComents(id)
    this.isLoggedIn = this.storageService.isLoggedIn()
    this.PostId = id
    this.UserId = this.storageService.getUser().id
    
  }

  //posts
  retriveComents(id: any): void{
    this.comentService.getComents(id).subscribe({
      next: (data) => {
        this.coments = data
        console.log(data)
      }
    })
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
    this.currentPost.likes++
    const data = {
      likes: this.currentPost.likes
    }
    this.postService.update(this.currentPost.id, data).subscribe({
      next: (res) => {
        console.log(res)
        this.currentPost.likes
      },
       error: (e) => console.error(e)
    })

  }

  deletePost(idCriador: any): void{
    if (idCriador == this.UserId) {
      this.postService.delete(this.currentPost.id)
        .subscribe({
          next: (res) => {
            console.log(res)
            this.router.navigate(['/posts'])
          },
          error: (e) => console.error(e)
        })
    }
    else {
      window.alert('Você não tem permissão para excluir este post.');
    }

  } 

  updatePost(): void{

    const data = {
      title: this.currentPost.title,
      desc: this.currentPost.desc,
      content: this.currentPost.content
    }
    console.log(data)
    this.postService.update(id, data).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: err => {
        this.erroM = err.error.message;
      }
    })

  }


  //coments
  saveComent(): void{
    const data = {
      coment: this.comentario,
      UserId: this.UserId,
      PostId: this.PostId
    }

    this.comentService.createComent(data).subscribe({
      next: (res) => { 
        console.log(res)
        window.location.reload() //recarega pagina
      },
      error: err => {
        this.erroM = err.error.message;
      }
    })

   }

  deleteComent(id: any): void { 
    this.comentService.deleteComent(id)
    .subscribe({
        next: (res) => {
        console.log(res)
        window.location.reload()
        },
        error: (e) => console.error(e)
      })
  }

  updateComent(Cid: any): void {
    const data = {
      coment: this.comenta
    }
    this.comentService.updateComent(Cid, data).subscribe({
      next: (res) => {
        console.log(res)
        window.location.reload()
      },
      error: err => {
        this.erroM = err.error.message;
      }
    })
  }

  likeComent(Cid:any, like:number): void{
    like = like + 1
    const data = {
      like: like
    }
    this.comentService.updateComent(Cid, data).subscribe({
      next: (res) => {
        console.log(res)
        window.location.reload()
      },
       error: (e) => console.error(e)
    })

  }

    redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
