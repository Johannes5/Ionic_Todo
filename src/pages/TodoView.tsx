import React, {useContext} from 'react'
import {
    IonBackButton,
    IonButtons,IonContent, IonFab, IonFabButton, IonHeader,
    IonIcon, IonList,
    IonPage, IonTitle,
    IonToolbar,
} from "@ionic/react"

import {addOutline} from "ionicons/icons"

import { useParams } from "react-router-dom"


import { TodoItem } from '../components/TodoItem'
import {EditModal} from "../components/EditModal"

import ListContext from '../list-context'

export const TodoView: React.FC = () => {
    const listContext = useContext(ListContext)
    const selectedListId = useParams<{ listId: string }>().listId

    const selectedList = listContext.lists.find(l => l.id === selectedListId) //DUMMY_DATA.find(l => l.id === selectedListId)
    let selectedTodoList = selectedList?.todos //DUMMY_DATA.find(l => l.id === selectedListId)?.todos



    //state
    const [selectedTodo, setSelectedTodo] = React.useState<any>(null)
    const [showEditModal, setShowEditModal] = React.useState(false)


    // closeSliderRef
    const closeSliderRef = React.useRef<HTMLIonItemSlidingElement>(null)

    // checkOffHandler
    const checkOffHandler = (id: string) => {
        //selectedTodoList?.filter(l => l.id === id)
        listContext.deleteTodo(selectedListId, id)
    }

    // editHandler
    const editHandler = (id: string, text: string) => {
        setShowEditModal(true)
        closeSliderRef.current?.closeOpened()
        setSelectedTodo({id: id, text: text})
    }

    const cancelEditTodoHandler = () => {
        setShowEditModal(false)
    }
    const saveTodoHandler = (text: string) => {
        if (selectedTodo){
            //update
            listContext.updateTodo(selectedListId, selectedTodo.id, text)
        } else {
            // create
            //selectedTodoList!.push({id: selectedTodo.id, text: text})
            listContext.addTodo(selectedListId, text)
            console.log("saveTodoHandlerr", selectedListId, text);
        }

        setShowEditModal(false)
        //setSelectedTodo({id: selectedTodo.id,  text: text})

    }
    const addHandler = () => {
        setShowEditModal(true)
        //setSelectedTodo({id: uuidv4(), text: ''})
    }

    return (
        <IonPage>
            <EditModal type={"todo"} show={showEditModal} onCancel={cancelEditTodoHandler}
                       editedItem={selectedTodo} onSaveTodo={saveTodoHandler}/>
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
                                  editHandler={editHandler.bind(null, list.id, list.text)}
                                  closeSliderRef={closeSliderRef}/>
                    ))}
                </IonList>
                <IonFab horizontal="end" vertical="bottom" slot="fixed">
                    <IonFabButton onClick={addHandler}>
                        <IonIcon icon={addOutline}>{}</IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

