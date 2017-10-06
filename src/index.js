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

import StateMachine from 'javascript-state-machine';


const createStoreWithMiddleware = applyMiddleware()(createStore);

var count = 0;

var log = function(msg, separate) {
  console.log(msg);
};

window.fsm = new StateMachine({


  transitions: [
    { name: 'start', from: 'none',   to: 'formA'  },
    { name: 'formA', from: 'none',   to: 'formA' },
    { name: 'formA', from: 'formB',  to: 'formA'  },
    { name: 'formB', from: 'formA',  to: 'formC' },
    { name: 'formC', from: 'formA',  to: 'formD' },
    { name: 'formC', from: 'formB',  to: 'formD' },
    { name: 'formD', from: 'formC',  to: 'none'  },
    { name: 'next',  from: '*', to: function(params) {
        console.log(params);
        if (params.age >= 18) {
          return 'formC';
        } else {
          return 'formB';
        }
      }
    }
  ],



  methods: {

    onBeforeTransition: function(lifecycle) {
      log("BEFORE: " + lifecycle.to, true);
    },

    onLeaveState: function(lifecycle) {
      log("LEAVE: " + lifecycle.from);
    },

    onEnterState: function(lifecycle) {
      log("ENTER: " + lifecycle.to);
      browserHistory.push(`/${lifecycle.to}`);
    },

    onAfterTransition: function(lifecycle) {
      log("AFTER: " + lifecycle.transition);

    },

    onTransition: function(lifecycle) {
      log("DURING: " + lifecycle.transition + " (from " + lifecycle.from + " to " + lifecycle.to + ")");
    },


    onFormA: function() {
      console.log("came to form A");
    },

    onLeaveformA: function(lifecycle) {
      console.log("leaving A");
    }

  }
});

// fsm.start();
// fsm.formA();

fsm.start();



ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/formA" component={formA} />
    <Route path="/formB" component={formB} />
    <Route path="/formC" component={formC} />
    <Route path="/formD" component={formD} />
  </Router>)
  , document.querySelector('.container'));



