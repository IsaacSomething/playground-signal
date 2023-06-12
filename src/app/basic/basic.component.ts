import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'base-home',
  standalone: true,
  imports: [MatButtonModule, HighlightModule],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js')
      }
    }
  ],
  template: `
    <h1>{{ num() }}</h1>

    <button mat-stroked-button class="mr-4" (click)="increment()">Increment</button>
    <button mat-stroked-button class="mr-4" (click)="decrement()">Decrement</button>
    <button mat-stroked-button (click)="reset()">Reset</button>

    <pre class="mt-6"><code class="rounded-lg" [highlight]="code" [languages]="['typescript']" ></code></pre>
  `
})
export class HomeComponent {
  private readonly NUM_INITIAL = 0;
  num = signal<number>(this.NUM_INITIAL);

  code = `
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
