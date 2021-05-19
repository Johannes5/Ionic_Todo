import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import ListTabs from './pages/ListTabs';
/*import Filter from '../../Ionic Courses/src/pages/Filter';
import {SideDrawer} from '../../Ionic Courses/src/pages/SideDrawer';*/

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ListContextProvider from "./ListContextProvider";
import React from "react";

const App: React.FC = () => (
    <IonApp>
      <IonReactRouter>
          <ListContextProvider>
              <IonRouterOutlet id="main">
                  {/*<Route path="/filter" exact>
              <Filter/>
            </Route>*/}
                  <Route path="/lists">
                      <ListTabs/>
                  </Route>
                  <Redirect path="" to="/lists" exact/>
              </IonRouterOutlet>
          </ListContextProvider>
      </IonReactRouter>
    </IonApp>
);

export default App;
