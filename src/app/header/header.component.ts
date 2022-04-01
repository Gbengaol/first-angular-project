import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

export type TRoute = 'recipe' | 'shopping';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Output() routeSelected = new Subject<TRoute>();
  constructor() {}

  ngOnInit(): void {}

  changeRoute(route: TRoute) {
    this.routeSelected.next(route);
  }
}
