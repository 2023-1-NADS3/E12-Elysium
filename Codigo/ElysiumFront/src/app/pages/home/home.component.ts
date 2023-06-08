import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

interface Game {
  team1: {
    name: string;
    icon: string;
  };
  team2: {
    name: string;
    icon: string;
  };
  result: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  gamesToday: Game[] = [];
  pastGames: Game[] = [];

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
    }

    this.showGamesToday();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  showGamesToday() {
    this.gamesToday = [
      { team1: { name: 'Team A', icon: 'assets/keyd.png' }, team2: { name: 'Team B', icon: 'assets/imperial.png' }, result: '' },
      { team1: { name: 'Team C', icon: 'assets/g2.png' }, team2: { name: 'Team D', icon: 'assets/furia.png' }, result: '' },
      { team1: { name: 'Team E', icon: 'assets/unn.png' }, team2: { name: 'Team F', icon: 'assets/tlt.png' }, result: '' }

    ];
    this.pastGames = [];
  }

  showPastGames() {
    this.gamesToday = [];
    this.pastGames = [
      { team1: { name: 'Team E', icon: 'assets/boom.png' }, team2: { name: 'Team F', icon: 'assets/red.png' }, result: '3 - 2' },
      { team1: { name: 'Team G', icon: 'assets/keyd.png' }, team2: { name: 'Team H', icon: 'assets/tlt.png' }, result: '1 - 2' },
      { team1: { name: 'Team I', icon: 'assets/g2.png' }, team2: { name: 'Team J', icon: 'assets/unn.png' }, result: '2 - 3' }

    ];
  }
}
