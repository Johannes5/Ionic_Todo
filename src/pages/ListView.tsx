import React, {useContext, useState} from 'react'
import {
    IonCol,
    IonContent, IonFab, IonFabButton,
    IonGrid,
    IonHeader,
    IonIcon,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import {addOutline, list, trophyOutline} from "ionicons/icons";
import {ListItem} from '../components/ListItem'
import {EditModal} from "../components/EditModal";
import ListContext, {List} from '../list-context';

export let DUMMY_DATA = [
    {
        listTitle: "List 1",
        id: "c1",
        createdAt: new Date("03/05/2121"),
        todos: [{
            id: "c1g1",
            text: "Complete C"
        }, {
            id: "c1g2",
            text: "Learn D"
        }]
    },
    {
        listTitle: "List 1",
        id: "c2",
        createdAt: new Date("03/05/2121"),
        todos: [{
            id: "c2g1",
            text: "Complete A"
        }, {
            id: "c2g2",
            text: "Learn B"
        }]
    }
]


const ListView: React.FC = () => {
    const listContext = useContext(ListContext)

    const [selectedList, setSelectedList] = useState<any>()
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    //const [lists, setLists] = useState<List[]>(listContext.lists)

    const cancelEditListHandler = () => {
        setShowEditModal(false)
    }

    const saveListHandler = (listTitle: string, date: Date) => {
        /*if (selectedList){
            //update
            /!*DUMMY_DATA?.map((list)=> {
                if(list.id === selectedList.id){
                    list.listTitle = text
                }
            })*!/
            console.log("List already exits");
        } else {
            // create
            const createdAt: Date = new Date ()
            listContext.addList(listTitle, createdAt)
            //DUMMY_DATA!.push({id: selectedList.id, listTitle: text, todos: [], createdAt: createdAt})
        }*/
        listContext.addList(listTitle, date)
        setShowEditModal(false)
        console.log('listContext.lists', listContext.lists);
        console.log("saveTodoHandler", listTitle, date);

    }

    const editHandler = (listId: string) => {
        setShowEditModal(true)
        setSelectedList(listContext.lists.find(l => l.id === listId))
    }

    const addHandler = () => {
        setShowEditModal(true)
        //setSelectedList({id: uuidv4(), text: ''})
    }

    return (
        <IonPage>
            <EditModal type={"list"} editedItem={selectedList} onCancel={cancelEditListHandler} show={showEditModal}
                       onSaveList={saveListHandler}/>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Lists</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    {listContext.lists.map((list) => (
                        <IonRow key={list.id}>
                            <IonCol size-md="4" offset-md="4">
                                <ListItem id={list.id} createdAt={list.createdAt} title={list.listTitle}
                                          editHandler={editHandler.bind(null, list.id)}/>
                            </IonCol>
                        </IonRow>)
                    )}
                </IonGrid>
                <IonFab horizontal="end" vertical="bottom" slot="fixed">
                    <IonFabButton >
                        <IonIcon icon={addOutline} onClick={addHandler}>{}</IonIcon>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default ListView;
