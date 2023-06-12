import { Injectable, computed, signal } from '@angular/core';
import { ITodo } from './todos.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos = signal<ITodo[]>([]);
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
  }
}
