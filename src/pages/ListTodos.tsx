import React from 'react'
import {
    IonBackButton,
    IonButtons,IonContent, IonFab, IonFabButton, IonHeader,
    IonIcon, IonList,
    IonPage, IonTitle,
    IonToolbar,
} from "@ionic/react";

import {addOutline} from "ionicons/icons";

import { useParams } from "react-router-dom";


import {DUMMY_DATA} from "./Lists";
import { TodoItem } from '../components/TodoItem';
import {EditModal} from "../components/EditModal";


export const ListTodos: React.FC = () => {
    // selectedList
    const selectedListId = useParams<{ listId: string }>().listId;
    const selectedList = DUMMY_DATA.find(l => l.id === selectedListId)
    let selectedTodoList = DUMMY_DATA.find(l => l.id === selectedListId)?.todos
    // console.log("Howdy",selectedListId, selectedList?.listTitle);

    //state
    const [selectedTodo, setSelectedTodo] = React.useState<any>()
    const [showEditModal, setShowEditModal] = React.useState(false)


    // closeSliderRef
    const closeSliderRef = React.useRef<HTMLIonItemSlidingElement>(null)

    // checkOffHandler
    const checkOffHandler = (id: string) => {
        selectedTodoList?.filter(l => l.id === id)
    }

    // editHandler
    const editHandler = (id: string) => {
        setShowEditModal(true)
        closeSliderRef.current?.closeOpened()
        setSelectedTodo(id)
    }

    const cancelEditTodoHandler = () => {
        setShowEditModal(false)
    }
    const saveTodoHandler = (text: string) => {
        if (selectedTodo){
            //update
            selectedTodoList?.map((todo)=> {
                if(todo.id === selectedTodo.id){
                    todo.text = text
                }
            })
        } else {
            // create
            selectedTodoList?.push({id: selectedTodo.id, text: text})
        }

        setShowEditModal(false)
        console.log("saveTodoHandler", text);

    }

    return (
        <IonPage>
            <EditModal type={"todo"} show={showEditModal} onCancel={cancelEditTodoHandler}
                       editedTodo={selectedTodo} onSaveTodo={saveTodoHandler}/>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/"/>
                    </IonButtons>
                    <IonTitle>
                        {selectedList ? selectedList.listTitle : "no List found"}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {selectedTodoList && selectedTodoList.map((list) => (
                        <TodoItem id={list.id} text={list.text}
                                  checkOffHandler={checkOffHandler.bind(null, list.id)}
                                  editHandler={editHandler.bind(null, list.id)}
                                  closeSliderRef={closeSliderRef}/>
                    ))}
                </IonList>
                <IonFab horizontal="end" vertical="bottom" slot="fixed">
                    <IonFabButton >
                        <IonIcon icon={addOutline}>{}</IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

