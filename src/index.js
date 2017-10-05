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
            'next_form': function() {
              console.log("in the next form");
            },
            "next":  {
              // target: "formC",
              action: function() {

                const s = this.state("formC");
                console.log('in action');
                this.transition(s);
              },
              guard: function(params) {

                console.log(params);

                if (params.work_or_student === 'work') {
                  console.log("work");
                } else {
                  console.log("student");
                }

                console.log('came to guard');
                return true;
              }
            }
        },
        "formB": {
            "entry": function(params) {
              console.log("Came to formB");
              console.log(params);
              browserHistory.push('/formB');
            },
            "next":  { target: "formC"  },
            "previous": { target: "formA" }
        },
        "formC": {
            "entry": function(params) {
              console.log("Came to formC");
              console.log(params);
              browserHistory.push('/formC');
            },
            "next":  { target: "formD"  },
            "previous": { target: "formB" }
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


window.stateMachine.run();

