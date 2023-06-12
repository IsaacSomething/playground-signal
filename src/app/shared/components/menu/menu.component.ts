import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { routeProps } from '@base/app-routing.module';

@Component({
  selector: 'base-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatToolbarModule, MatListModule],
  styles: [],
  template: `
    <mat-toolbar class="bg-transparent">
      <span class="uppercase mt-[3px] ml-[7px] text-sm">Signal</span>
    </mat-toolbar>

    <mat-nav-list>
      <mat-list-item *ngFor="let route of routes" [routerLink]="route.path">
        <mat-icon matListItemIcon *ngIf="route?.data as data">{{ data['icon'] }}</mat-icon>
        <div matListItemTitle>{{ route.title }}</div>
      </mat-list-item>

      <!--   <mat-list-item *ngFor="let item of [1, 1, 1, 1, 1, 1]" routerLink="/">
        <mat-icon matListItemIcon>folder</mat-icon>
        <div matListItemTitle>Item</div>
      </mat-list-item> -->
    </mat-nav-list>
  `
})
export class MenuComponent {
  routes = routeProps;

  constructor() {}
}
