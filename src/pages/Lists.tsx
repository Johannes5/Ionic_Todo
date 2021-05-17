import React from 'react'
import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonLabel,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import {list, trophyOutline} from "ionicons/icons";
import {ListItem} from '../components/ListItem'

export const DUMMY_DATA = [
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


const Lists: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Lists</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    {DUMMY_DATA.map((list) =>(
                        <IonRow key={list.id}>
                            {console.log("Howdy", )}
                            <IonCol size-md="4" offset-md="4">
                                <ListItem id={list.id} createdAt={list.createdAt} title={list.listTitle}/>
                            </IonCol>
                        </IonRow>)
                    )}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Lists;
