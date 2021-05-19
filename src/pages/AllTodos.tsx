import React, {useContext} from 'react'
import {
    IonBackButton,
    IonButtons, IonContent, IonHeader, IonItem, IonLabel,
    IonList,
    IonPage, IonTitle,
    IonToolbar,
} from "@ionic/react";
import ListContext, {Todo, List} from '../list-context'

export const AllTodos: React.FC = () => {

    const listContext = useContext(ListContext)

    const allTodos = listContext.lists.map((li: List) => {
        return li.todos.map((td: Todo) => {
            return {...td, list: li.listTitle}
        })
    }).reduce((acc, curTodos) => {
        const updatedTodos = curTodos
        curTodos.map((td) => {
            updatedTodos.concat(td)
        })
        return updatedTodos
    })
    console.log("allTodos", allTodos)


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/"/>
                    </IonButtons>
                    <IonTitle>
                        All Todos
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {
                        allTodos && allTodos.map((todo: any) => (
                            <IonItem><IonLabel><h2>{todo.text}</h2><p>{todo.list}</p></IonLabel></IonItem>
                        ))
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
};

