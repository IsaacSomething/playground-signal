import { JsonPipe, NgFor } from '@angular/common';
import { Component, ViewChild, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'base-todos',
  standalone: true,
  imports: [NgFor, JsonPipe, MatButtonModule, HighlightModule, MatListModule, MatFormFieldModule, MatInputModule],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js')
      }
    }
  ],
  template: `
    <h1>Todo</h1>

    <mat-selection-list (selectionChange)="change($event)">
      <mat-list-option *ngFor="let todo of todos(); let idx = index" [value]="todo">
        {{ idx + 1 }}: <span [class.line-through]="todo.done">{{ todo.value }}</span>
      </mat-list-option>
    </mat-selection-list>

    <mat-form-field appearance="fill" class="block w-72 !bg-transparent">
      <mat-label>Todo</mat-label>
      <input #todo matInput class="block w-72 !bg-transparent" />
    </mat-form-field>

    <button mat-stroked-button class="mr-4" (click)="add(todo)">Add</button>
  `
})
export class TodosComponent {
  todos = signal<{ value: string; done: boolean }[]>([]);

  add(todo: HTMLInputElement) {
    console.log('sdfsdf', todo);

    this.todos.update(todos => [...todos, { value: todo.value, done: false }]);
    todo.value = '';
  }

  change($event: MatSelectionListChange) {
    console.log('selected', $event.options);
    console.log('selected', $event.options[0].selected);
  }
}
