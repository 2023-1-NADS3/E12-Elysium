import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//add
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//add2
import { httpInterceptorProviders } from './_helpers/http.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { FooterComponent } from './sharepage/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { TimesComponent } from './pages/times/times.component';
import { NewsComponent } from './pages/news/news.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PostsComponent } from './pages/posts/posts.component';
import { MakePostsComponent } from './pages/make-posts/make-posts.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    TimesComponent,
    NewsComponent,
    LoginComponent,
    CadastroComponent,
    ProfileComponent,
    PostsComponent,
    MakePostsComponent,
    ViewPostComponent,
    ProfilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
