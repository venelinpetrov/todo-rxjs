import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TodosStoreService } from './todos-store.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    title = 'with-rxjs';
    constructor(public todosStore: TodosStoreService) {}
    todosTrackFn = (_, todo) => todo.id;
}
