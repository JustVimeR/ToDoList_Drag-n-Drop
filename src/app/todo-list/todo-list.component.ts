import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SocketService } from '../socket.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{
  todos: string[] = [];
  newTodo: string = '';

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.loadTodos().subscribe((todos: string[]) => {
      this.todos = todos;
      this.saveTodos();
    });

    this.socketService.onTodoUpdate().subscribe((todos: string[]) => {
    this.todos = todos;
  });
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    this.saveTodos();
  }

  addTodo(): void {
    if (this.newTodo.trim()) {
      this.todos.push(this.newTodo.trim());
      this.newTodo = '';
      this.saveTodos();
    }
  }

  removeTodo(index: number): void {
    this.todos.splice(index, 1);
    this.saveTodos();
  }
  
  trackByIndex(index: number): number {
    return index;
  }

  saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.socketService.updateTodos(this.todos);
  }
}
