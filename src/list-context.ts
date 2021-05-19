import React from "react";

export interface Todo {
    id: string,
    text: string
}

export interface List {
    id: string,
    listTitle: string,
    createdAt: Date,
    todos: Todo[]
}

export interface ListContext {
    lists: List[],
    addList: (listTitle: string, createdAt: Date ) => void,
    addTodo: (listId: string, text: string) => void,
    deleteTodo: (listId: string, todoId: string) => void,
    updateTodo: (listId: string, todoId: string, text: string) => void
}

const ListContext = React.createContext<ListContext>({
    lists: [],
    addList: () => {},
    addTodo: () => {},
    deleteTodo: () => {},
    updateTodo: () => {}
})

export default ListContext
