import { JsonPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Signal, WritableSignal, effect, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { HighlightModule } from 'ngx-highlightjs';
import { TodosService } from './todos.service';
import { ITodo } from './todos.interface';

@Component({
  selector: 'base-todos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    JsonPipe,
    MatButtonModule,
    HighlightModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatBadgeModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  template: `
    <h1>Todo <mat-icon [matBadge]="todosLength()" matBadgeColor="warn" [matBadgeHidden]="!todosLength()"> checklist </mat-icon></h1>

    <mat-form-field appearance="fill" class="block focus:!bg-transparent !bg-transparent w-full">
      <mat-label>Description</mat-label>
      <input #todo matInput class="block f !bg-transparent" />
    </mat-form-field>

    <button mat-raised-button class="mr-4" [disabled]="todo.value.length === 0" (click)="add(todo)">Add</button>

    <mat-selection-list (selectionChange)="change($event)" class="!mt-6">
      <ng-container *ngFor="let todo of todos(); let idx = index">
        <div class="flex">
          <mat-list-option [value]="todo" checkboxPosition="before" [selected]="todo.done">
            {{ idx + 1 }}: <span [class.line-through]="todo.done">{{ todo.label }}</span>
          </mat-list-option>

          <button mat-icon-button (click)="delete(todo)"><mat-icon color="warn">delete</mat-icon></button>
        </div>
      </ng-container>
    </mat-selection-list>

    <pre><code [highlight]="code" [languages]="['typescript']" class="rounded-lg mt-4"></code></pre>
  `
})
export class TodosComponent {
  private todosService = inject(TodosService);
  private snackBar = inject(MatSnackBar);
  todos: WritableSignal<ITodo[]> = this.todosService.todos;
  todosLength: Signal<number> = this.todosService.todosLength;
  readonly code = `  todos = signal<ITodo[]>([]);
  todosLength = computed<number>(() => this.todos().filter(todo => !todo.done).length);

  add({ label }: ITodo) {
    this.todos.update(todos => [...todos, { label, done: false }]);
  }

  done(todo: ITodo) {
    this.todos.update(todos => todos.map(t => (t === todo ? { ...t, done: true } : t)));
  }

  undone(todo: ITodo) {
    this.todos.update(todos => todos.map(t => (t === todo ? { ...t, done: false } : t)));
  }

  remove(todo: ITodo) {
    this.todos.update(todos => todos.filter(t => t !== todo));
  }`;

  add(todo: HTMLInputElement) {
    this.todosService.add({ label: todo.value, done: false });
    todo.value = '';
    this.showSnackbar('Todo added');
  }

  change($event: MatSelectionListChange) {
    if ($event.options[0].selected) {
      this.todosService.done($event.options[0].value);
      this.todosLength() === 0 ? this.showSnackbar('All todos done!') : this.showSnackbar('Todo done');
      return;
    }

    this.todosService.undone($event.options[0].value);
    this.showSnackbar('Todo undone');
  }

  delete(todo: ITodo) {
    this.todosService.remove(this.todos()[0]);
    this.showSnackbar('Todo removed');
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Dismiss', { verticalPosition: 'top', horizontalPosition: 'right', duration: 2000 });
  }
}
