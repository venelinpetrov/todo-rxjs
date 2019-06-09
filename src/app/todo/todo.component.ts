import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  constructor() { }

  @Input() todo: Todo;
  @Output() complete = new EventEmitter<boolean>();
  @Output() remove = new EventEmitter<string>();
}
