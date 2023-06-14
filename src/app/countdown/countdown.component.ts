import { Component, Input, OnInit, effect, signal } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { timer } from 'rxjs';
const confetti = require('canvas-confetti');

@Component({
  selector: 'base-countdown',
  standalone: true,
  imports: [HighlightModule],
  template: `
    <h1>Countdown</h1>
    <h1>{{ countdown() }}</h1>

    <pre><code [highlight]="code" [languages]="['typescript']" class="rounded-lg mt-4"></code></pre>
  `
})
export class CountdownComponent implements OnInit {
  @Input() id!: number;
  countdown = signal<number | undefined>(undefined);
  code = `  countdown = signal<number | undefined>(undefined);

  effect(
    () => {
      if (this.countdown() === undefined) return;

      if (this.countdown() === 0) {
        this.confetti();
        return;
      }

      timer(1000).subscribe(() => {
        if (this.countdown()) {
          this.countdown.set((this.countdown() as number) - 1);
        }
      });
    },
    { allowSignalWrites: true, manualCleanup: true }
  );
  
  ngOnInit() {
    this.countdown.set(this.id);
  }`;

  constructor() {
    effect(
      () => {
        if (this.countdown() === undefined) return;

        if (this.countdown() === 0) {
          this.confetti();
          return;
        }

        timer(1000).subscribe(() => this.countdown.set((this.countdown() as number) - 1));
      },
      { allowSignalWrites: true, manualCleanup: true }
    );
  }

  ngOnInit() {
    this.countdown.set(this.id);
  }

  private confetti() {
    const canvas = document.getElementById('confetti') as HTMLCanvasElement;
    const confettiCreate = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });

    for (let i = 0; i < 6; i++) {
      timer(i * 1000).subscribe(() => {
        confettiCreate({
          angle: this.random(60, 120),
          spread: this.random(10, 50),
          particleCount: this.random(40, 50),
          origin: { y: 0.6 }
        });
      });
    }
  }

  private random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
