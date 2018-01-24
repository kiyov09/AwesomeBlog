import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PostsList from './containers/PostsList';
import PostView from './containers/PostView';

import AppHeader from './components/AppHeader';

export default () => {
    return (
       <BrowserRouter>
           <div>
               <AppHeader />
               <Switch>
                   <Route exact path="/" component={ PostsList } />
                   <Route exact path="/post/:id" component={ PostView } />
               </Switch>
           </div>
       </BrowserRouter>
    )
}
