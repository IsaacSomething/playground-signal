import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'base-toolbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule],
  styles: [``],
  template: `
    <mat-toolbar>
      <button mat-icon-button *ngIf="small" (click)="sidenav.toggle()">
        <mat-icon>{{ sidenav.opened ? 'menu_open' : 'menu' }}</mat-icon>
      </button>
      .
      <span class="spacer"></span>
      <button mat-icon-button><mat-icon>show_chart</mat-icon></button>
      <button mat-icon-button><mat-icon>line_weight</mat-icon></button>
    </mat-toolbar>
  `
})
export class ToolbarComponent {
  @Input() sidenav!: MatSidenav;
  @Input() small!: boolean | null;
}
