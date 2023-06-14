import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'base-home',
  standalone: true,
  imports: [MatButtonModule, HighlightModule],
  template: `
    <h1>{{ num() }}</h1>

    <button mat-raised-button class="mr-4" (click)="increment()">Increment</button>
    <button mat-raised-button class="mr-4" (click)="decrement()">Decrement</button>
    <button mat-raised-button (click)="reset()">Reset</button>

    <pre><code [highlight]="code" [languages]="['typescript']" class="rounded-lg mt-4"></code></pre>
  `
})
export class HomeComponent {
  private readonly NUM_INITIAL = 0;
  num = signal<number>(this.NUM_INITIAL);

  code = `  private readonly NUM_INITIAL = 0;
  num = signal<number>(this.NUM_INITIAL);

  increment() {
    this.num.update(value => ++value);
  }

  decrement() {
    this.num.update(value => --value);
  }

  reset() {
    this.num.set(this.NUM_INITIAL);
  }`;

  increment() {
    this.num.update(value => ++value);
  }

  decrement() {
    this.num.update(value => --value);
  }

  reset() {
    this.num.set(this.NUM_INITIAL);
  }
}
