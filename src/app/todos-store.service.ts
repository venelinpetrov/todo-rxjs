import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { uuid } from './uuid';
import { Todo } from './todo.model';
import { TodosService } from './todos.service';

@Injectable({ providedIn: 'root' })
export class TodosStoreService {
    constructor(private todoService: TodosService) {
        this.getAllTodos();
    }

    private readonly _todos = new BehaviorSubject<Todo[]>([]);
    private readonly todos$ = this._todos.asObservable();

    readonly completedTodos$ = this.todos$.pipe(
        map((todos: Todo[]) =>
            todos.filter((todo: Todo) => todo.isCompleted)
        )
    );

    readonly uncompletedTodos$ = this.todos$.pipe(
        map((todos: Todo[]) =>
            todos.filter((todo: Todo) => !todo.isCompleted)
        )
    );

    async addTodo(title: string){
        const tmpId = uuid();
        const tmpTodo: Todo = {
            id: tmpId,
            title,
            isCompleted: false
        }

        this.todos = [
            ...this.todos,
            tmpTodo
        ];

        try {
            const todoFromServer = await this.todoService.create(tmpTodo).toPromise();
            const idx = this.todos.findIndex(todo => todo.id === tmpId)
            this.todos[idx] = {
                ...todoFromServer
            };
            this.todos = [...this.todos];

        } catch (err) {
            console.error(err);
            this.removeTodo(tmpId, false);
        }
    }

    async removeTodo(id: string, removeFromServier: boolean = true) {
        const todo = this.todos.find(todo => todo.id === id);
        this.todos = this.todos.filter(todo => todo.id !== id);

        if(removeFromServier) {
            try {
                await this.todoService.remove(id).toPromise();
            } catch(e) {
                console.error(e);
                this.todos = [...this.todos, todo];
            }
        }
    }

    async setCompleted(id: string, isCompleted: boolean) {
        const todo = this.todos.find(todo => todo.id === id);
        const idx = this.todos.indexOf(todo);

        this.todos[idx] = {
            ...todo,
            isCompleted
        }
        this.todos = [...this.todos];

        try {
            await this.todoService.setCompleted(id, isCompleted).toPromise();
        } catch (e) {
            this.todos[idx] = {
                ...todo,
                isCompleted: !isCompleted
            }
        }
    }

    get todos() {
        return this._todos.getValue();
    }

    set todos(todos: Todo[]) {
        this._todos.next(todos);
    }

    async getAllTodos() {
        this.todos = await this.todoService.getAllTodos().toPromise();
    }
}