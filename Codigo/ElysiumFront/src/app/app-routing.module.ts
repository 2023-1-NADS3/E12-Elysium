import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { TimesComponent } from './pages/times/times.component';
import { NewsComponent } from './pages/news/news.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MakePostsComponent } from './pages/make-posts/make-posts.component'
import { PostsComponent } from './pages/posts/posts.component'
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { FaqComponent } from './pages/faq/faq.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'times', component: TimesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create', component: MakePostsComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'view', component: ViewPostComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

