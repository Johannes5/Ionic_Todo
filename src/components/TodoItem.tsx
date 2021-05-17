import React from 'react'
import {
    IonIcon,
    IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel,
} from "@ionic/react";
import {checkmark, create} from "ionicons/icons";

export const TodoItem: React.FC<{
    id: string,
    text: string,
    checkOffHandler: (event: React.MouseEvent) => void,
    editHandler: (event: React.MouseEvent) => void,
    closeSliderRef: React.Ref<HTMLIonItemSlidingElement>
}> = props => {
    return (
        <IonItemSliding key={props.id} ref={props.closeSliderRef}>
            <IonItemOptions side="start">
                <IonItemOption onClick={props.checkOffHandler}>
                    <IonIcon slot="icon-only" icon={checkmark} />
                </IonItemOption>
            </IonItemOptions>

            <IonItem>
                <IonLabel>{props.text}</IonLabel>
            </IonItem>

            <IonItemOptions side="end">
                <IonItemOption onClick={props.editHandler}>
                    <IonIcon slot="icon-only" icon={create} />
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
};

