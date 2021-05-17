import {
    IonButton, IonCol, IonContent,
    IonGrid,
    IonHeader,
    IonInput, IonItem,
    IonItemDivider,
    IonList,
    IonModal,
    IonRow,
    IonText, IonTitle,
    IonToolbar
} from '@ionic/react'
import React, {MutableRefObject, useRef, useState} from 'react'
import { v4 as uuidv4 } from 'uuid'

export const EditModal: React.FC<{
    type: 'todo' | 'list';
    show: boolean;
    onCancel: () => void;
    editedTodo: { id: string; text: string } | null; //why not optional?

    //This modal can save either Todos or Lists -> optional props
    onSaveList?: (title: string, date: Date) => void;
    onSaveTodo?: (text: string) => void;
}> = props => {
    const [input, setInput] = useState<string>();
    const [error, setError] = useState<string>();


    const inputRef = useRef<HTMLIonInputElement | null>(null)

    const savedInputHandler = () => {
        props.onCancel();
        if(props.type === 'list'){
            addOrEditListHandler()
        } else if (props.type === 'todo'){
            addOrEditTodoHandler()
        }


    }

    const addOrEditTodoHandler = () => {
        const text = inputRef.current?.value
        setInput("");
        props.onCancel();

        if (!text || text.toString().trim().length === 0){
            setError('please enter a valid text')
            return
        }
        setError('');
        props.onSaveTodo?.(text.toString())
    }

    const addOrEditListHandler = () => {
        const text = inputRef.current?.value
        setInput("");
        props.onCancel();

        const createdAt = new Date()

        if (!text || text.toString().trim().length === 0){
            setError('please enter a valid text')
            return
        }
        setError('');
        props.onSaveList?.(text.toString(), createdAt)
    }


    return (
        <IonModal
            isOpen={props.show}
            onDidDismiss={() => props.onCancel}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Edit {props.type}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonList>
                                <IonItemDivider>Your {props.type}</IonItemDivider>
                                <IonItem>
                                    <IonInput ref={inputRef}
                                              value={input}
                                              placeholder={props.editedTodo?.text}
                                              onIonChange={e => setInput(e.detail.value!)}>{}
                                    </IonInput>
                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-text-center">
                        <IonCol>
                            <IonText color="danger">
                                <p>Error</p>
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-text-right">
                        <IonCol  >
                            <IonButton expand="block" onClick={savedInputHandler}>Update</IonButton>
                        </IonCol>
                        <IonCol >
                            <IonButton fill="clear" >Cancel</IonButton>
                        </IonCol>

                    </IonRow>
                </IonGrid>
            </IonContent>

        </IonModal>
    )
}
