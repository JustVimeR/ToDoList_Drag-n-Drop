import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  loadTodos(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('loadTodos', (todos) => {
        observer.next(todos);
      });
    });
  }

  onTodoUpdate(): Observable<string[]> {
    return new Observable((observer) => {
      this.socket.on('updateTodos', (todos: string[]) => {
        observer.next(todos);
      });
    });
  }

  updateTodos(todos: string[]): void {
    this.socket.emit('updateTodos', todos);
  }
}
