import React from 'react'
import {
    IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonPage,
} from "@ionic/react";


export const ListItem: React.FC<{
    id: string,
    createdAt: Date,
    title: string
}> = props => {
    return (
            <IonCard>
                <IonCardHeader >
                    <IonCardTitle>{props.title}</IonCardTitle>
                    <IonCardSubtitle >
                        Created at {props.createdAt.toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit"
                    })}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonButton className="ion-text-left" fill="default">
                        Edit
                    </IonButton>
                    <IonButton className="ion-text-right" fill="clear" routerLink={`/lists/${props.id}`}>
                        View Todos
                    </IonButton>
                </IonCardContent>
            </IonCard>
    );
};

