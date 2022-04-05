import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

export type TRoute = 'recipe' | 'shopping';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() routeSelected = new Subject<TRoute>();
  error: string = '';
  isAuthenticated = false;
  userSubscription: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  // changeRoute(route: TRoute) {
  //   this.routeSelected.next(route);
  // }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe({
      error: (error) => {
        this.error = error.message;
      },
    });
  }
}
