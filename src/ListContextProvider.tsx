import React, { useState } from 'react'
import ListContext, {List, Todo} from './list-context'
import {v4 as uuidv4} from 'uuid'

const ListContextProvider: React.FC = props => {
    const [lists, setLists] = useState<List[]>([])

    const addList = (listTitle: string, createdAt: Date) => {
        const newList = {
            id: uuidv4().toString(),
            listTitle: listTitle,
            createdAt: createdAt,
            todos: [],
        }

        setLists(curLists => {
            return curLists.concat(newList)
        });

    }

    const addTodo = (listId: string, text: string) => {
        const newTodo: Todo = {
            id: uuidv4().toString(), // note to self: sometimes the id is fucked up / the same
            text: text,
        }
        setLists(curLists => {
            // I need to find the right list with the right id by using findIndex where the id matches
            const updatedLists = [...curLists]
            const updatedListIndex = updatedLists.findIndex((list) => {
                return listId === list.id
            });
            //console.log("updatedListIndex", updatedListIndex, "updatedLists", updatedLists)

            //updatedTodos will have the new todos concatenated
            const updatedTodos = updatedLists[updatedListIndex].todos.concat(newTodo)

            //I'll create a new updatedLists, because I don't wont to mess with memory. I need a new instance, that the react state can receive
            const updatedList = {...updatedLists[updatedListIndex]}
            updatedList.todos = updatedTodos
            updatedLists[updatedListIndex] = updatedList

            return updatedLists
        });
    }

    const deleteTodo = (listId: string, todoId: string) => {
        setLists((curLists) => {
            const updatedLists = [...curLists]
            const updatedListsIndex = updatedLists.findIndex((list) => {
                return listId === list.id
            });
            //console.log("updatedLists[updatedListsIndex].todos", updatedLists[updatedListsIndex].todos);
            const updatedTodos = updatedLists[updatedListsIndex].todos.filter((list) => {
                return list.id !== todoId
            });
            //console.log("updatedTodos", updatedTodos);
            const updatedList = {...updatedLists[updatedListsIndex]}
            updatedList.todos = updatedTodos
            updatedLists[updatedListsIndex] = updatedList

            return updatedLists
        });
    }

    const updateTodo = (listId: string, todoId: string, text: string) => {
        setLists((curLists) => {
            const updatedLists = [...curLists]
            const updatedListIndex = updatedLists.findIndex((list) => {
                return listId === list.id
            });

            const updatedTodos = updatedLists[updatedListIndex].todos.slice()
            const updatedTodosIndex = updatedTodos.findIndex((todo) => {
                return todoId === todo.id
            });
            updatedTodos[updatedTodosIndex] = {...updatedTodos[updatedTodosIndex], text: text}
            const updatedList = {...updatedLists[updatedListIndex]}
            updatedList.todos = updatedTodos
            updatedLists[updatedListIndex] = updatedList

            return updatedLists
        });
    }

    return (
        <ListContext.Provider value={{
            lists,
            addList,
            addTodo,
            deleteTodo,
            updateTodo
        }}>
            {props.children}
        </ListContext.Provider>
    )
}

export default ListContextProvider
