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

import _  from 'lodash';
import * as StateChart from '../lib/statechart'


const createStoreWithMiddleware = applyMiddleware()(createStore);


window.stateMachine = _.extend({

    initialState: "formA",
    // states: {
    //     'formA': {
    //         'next':  function(params) {
    //           console.log("params from formA", params);
    //           browserHistory.push('/formB');
    //         },
    //         'guard': function() { console.log("came to guard"); return true; }
    //     },
    //     'formB': {
    //         'previous':  function() { browserHistory.push('/formA') },
    //         'next':  function() {
    //           console.log("params from formB", params);
    //           browserHistory.push('/formC')
    //         },
    //         'guard': function() { console.log("came to guard"); return true; },
    //     }
    // }

    states: {
        "formA": {
            "entry": function() {
              console.log("Came to formA");
              browserHistory.push('/formA');
            },
            "exit": function() {
              console.log("came to can exit");
              const can_exit = this.valid();
              if (can_exit) {

              }
              return false;
            },
            "next":  {
              target: "formB",
              action: function() { console.log('in action');},
              guard: function() { console.log('came to guard'); return true; } }
        },
        "formB": {
            "entry": function(params) {
              console.log("Came to formB");
              console.log(params);
              browserHistory.push('/formB');
            },
            "next":  { target: "formC"  },
            "previous": { target: "formA" }
        }
    },
    valid: function() {
      return false;
    }

}, StateChart);



ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/formA" component={formA} />
    <Route path="/formB" component={formB} />
    <Route path="/formC" component={formC} />
    <Route path="/formD" component={formD} />
  </Router>)
  , document.querySelector('.container'));
