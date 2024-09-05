import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { Todo } from '../types/todo';
import { HttpTestingController } from '@angular/common/http/testing';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock:HttpTestingController;
  const todo:Todo = {desc:"fake desc",task:"fake task"}

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
    // httpMock = TestBed.inject(HttpTestingController)

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should add todo", () => {
      const allTodosLentgh = service.allTodos.length;
      service.addTodo(todo);
      expect(service.allTodos.length).toEqual(allTodosLentgh + 1);
    })
    
    it("should remove todo works", ()=> {
      service.addTodo(todo)
      const allTodosLentgh = service.allTodos.length;
        service.removeTodo(0);
        expect(service.allTodos.length).toEqual(allTodosLentgh-1);
  })

});
