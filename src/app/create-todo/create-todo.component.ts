import { Component } from '@angular/core';
import { TodosStoreService } from '../todos-store.service';

@Component({
    selector: 'create-todo',
    templateUrl: './create-todo.component.html'
})
export class CreateTodoComponent {
    constructor(private todosStore: TodosStoreService) {}

    onTodoCreate(title: string) {
        this.todosStore.addTodo(title);
    }
}
