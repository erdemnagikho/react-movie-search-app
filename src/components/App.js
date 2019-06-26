import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import Detail from './Detail/Detail';
import Header from './Elements/Header/Header';

const App = () => (
    <BrowserRouter>
        <React.Fragment>
            <Header />
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/:movieId" component={Detail} exact />
            </Switch>
        </React.Fragment>
    </BrowserRouter>
);

export default App;