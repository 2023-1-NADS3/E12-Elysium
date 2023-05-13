import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { Post } from 'src/app/_models/Post';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private storageService: StorageService, private postService: PostService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }


}