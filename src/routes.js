import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Main from './pages/Main';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';

function Routes (){
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/"exact component= {Main}/>
            <Route path="/contato" component= {Contato}/>
            <Route path="/sobre" component= {Sobre}/>

            
        </Switch>
        </BrowserRouter>
    );
};
export default Routes;