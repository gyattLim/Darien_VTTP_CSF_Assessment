
// TODO Task 2

import { ComponentStore } from "@ngrx/component-store";
import { Cart, LineItem } from "./models";
import { Injectable } from "@angular/core";

const INIT_STORE: Cart= {
    lineItems:[]
  }


// Use the following class to implement your store
@Injectable()
export class CartStore extends ComponentStore<Cart> {

    
    constructor(){super(INIT_STORE)}

  // Selectors
  readonly getItems = this.select<LineItem[]>(
    (slice: Cart) => slice.lineItems
  )

  readonly getNumberOfItems = this.select<number>(
    (slice: Cart) => slice.lineItems.length
  )

//   readonly getTodoByPriority = (priority: number) => {
//     return this.select<Todo[]>(
//       (slice: TodoSlice) => {
//         return slice.todos.filter(todo => todo.priority == priority)
//       }
//     )
//   }

  // Mutators
//   readonly deleteTaskByDate = this.updater<string>(
//     (slice: TodoSlice, date: string) => {
//       return {
//         loadedOn: slice.loadedOn,
//         todos: slice.todos.filter(todo => date != todo.date)
//       }
//     }
//   )

  readonly addItem = this.updater<LineItem>(
    (slice: Cart, lineItems: LineItem) => {
      /*
      const newTodos: Todo[] = []
      for (let t of slice.todos)
        newTodos.push(t)
      newTodos.push(todo)
      return {
        loadedOn: slice.loadedOn,
        todos: newTodos
      }
      */
      return {
        lineItems: [ ...slice.lineItems, lineItems ]
      }
    }
  )



}
