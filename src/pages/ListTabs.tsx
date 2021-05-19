import React from 'react';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabButton,
  IonTabBar,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { list, trophyOutline } from 'ionicons/icons';
import ListView from "./ListView";
import {TodoView} from './TodoView'
import {AllTodos} from "./AllTodos";



const ListTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect path='/lists' to='/lists/list' exact />
        <Switch>
          <Route path='/lists/list' exact>
           <ListView />
          </Route>
          <Route path='/lists/all-todos' exact>
            <AllTodos />
          </Route>
          <Route path='/lists/:listId'>
            <TodoView />
          </Route>
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
        <IonTabButton tab='all-todos' href='/lists/all-todos'>
          <IonIcon icon={list} />
          <IonLabel>All Todos</IonLabel>
        </IonTabButton>
        <IonTabButton tab='lists' href='/lists/list'>
          <IonIcon icon={trophyOutline} />
          <IonLabel>Lists</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default ListTabs;
