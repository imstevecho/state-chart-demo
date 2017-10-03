import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import formA from './components/form_A';
import formB from './components/form_B';
import formC from './components/form_C';
import formD from './components/form_D';

import reducers from './reducers';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import * as StateChart from '../lib/statechart'


const createStoreWithMiddleware = applyMiddleware()(createStore);



window.stateMachine = _.extend({

    initialState: "formA",
    states: {
        'formA': {
            'next':  function() { console.log('came here'); browserHistory.push('/formA'); },
            'gotoformC':  { target: 'formC'   },
        },
        'formB': {
            'previous':  { target: 'formA'  },
            'next':  { target: 'formD'  }
        }
    }

}, StateChart);


stateMachine.run();



ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/formA" component={formA} />
    <Route path="/formB" component={formB} />
    <Route path="/formC" component={formC} />
    <Route path="/formD" component={formD} />
  </Router>)
  , document.querySelector('.container'));
