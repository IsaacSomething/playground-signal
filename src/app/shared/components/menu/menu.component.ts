import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { routeProps } from '@base/app-routing.module';

@Component({
  selector: 'base-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatToolbarModule, MatListModule, MatButtonModule, MatSelectModule, FormsModule],
  template: `
    <mat-toolbar class="bg-transparent">
      <span class="uppercase mt-[3px] ml-[7px] text-sm">Signal</span>
    </mat-toolbar>

    <mat-nav-list>
      <ng-container *ngFor="let route of routes">
        <mat-list-item *ngIf="route.title !== 'Countdown'" [routerLink]="route.path">
          <mat-icon matListItemIcon *ngIf="route?.data as data">{{ data['icon'] }}</mat-icon>
          <div matListItemTitle>{{ route.title }}</div>
        </mat-list-item>
      </ng-container>
    </mat-nav-list>

    <div class="p-4 flex items-center gap-4">
      <button mat-raised-button class="w-full" (click)="routerLink()">Countdown</button>

      <mat-select class="max-w-[55px]" hideSingleSelectionIndicator [(ngModel)]="countdownValue">
        <mat-option *ngFor="let countdown of countdowns" [value]="countdown">
          {{ countdown }}
        </mat-option>
      </mat-select>
    </div>
  `
})
export class MenuComponent {
  private router = inject(Router);
  routes = routeProps;
  countdowns = [5, 10, 15, 20];
  countdownValue = 20;

  routerLink() {
    this.router.navigate(['countdown', this.countdownValue]);
  }
}
