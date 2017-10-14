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
import Interpreter from 'js-interpreter';
"use strict";

const createStoreWithMiddleware = applyMiddleware()(createStore);



var Ext = {version: 5.1};

function addGlobals(interpreter, scope) {

  var wrapper = function(target, value) {
    return interpreter.setProperty(scope, target, value);
  };
  interpreter.setProperty(scope, 'setGlobal', interpreter.createNativeFunction(wrapper));


  var wrapper = function(obj, name) {
    // return this.properties[obj].properties[name].data
    var parent_property = interpreter.getProperty(this, obj);
    var child_property = interpreter.getProperty(parent_property, name);

    return child_property.data;
  };
  interpreter.setProperty(scope, 'getGlobal', interpreter.createNativeFunction(wrapper));


  var wrapper = function(id) {
    return interpreter.createPrimitive(document.getElementById(id).value);
  };
  interpreter.setProperty(scope, 'getLocal', interpreter.createNativeFunction(wrapper));


  var wrapper = function(msg) {
    console.log(msg.data);
  };
  interpreter.setProperty(scope, 'log', interpreter.createNativeFunction(wrapper));


  var wrapper = function() {

    var v = this.properties['vparams'].properties['name'].data;
    debugger;

    var age = interpreter.getGlobal('vparams', 'age');
    debugger;
    console.log(age);

    return true;
  };
  interpreter.setProperty(scope, 'canProceed', interpreter.createNativeFunction(wrapper));


}





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
            },
            "next":  {
              // target: "formC",
              action: function(params) {
                let s = this.state("formC");
                if (params.age >= 18) {
                } else {
                  s = this.state('formB');
                }
                this.transition(s);
              },
              guard: function(params) {
                console.log("data validation goes here");

                var string_params = JSON.stringify(params);
                console.log("json string: ", string_params);
                var input_string = "setGlobal('vparams', " + string_params + ");  log('getGlobal result: ' + getGlobal('vparams', 'name')); log(vparams.age); log('canProcess result: ' + canProceed());";


                var myInterpreter = new Interpreter(input_string, addGlobals);
                myInterpreter.run()

                debugger;

                if (params.work_or_student  && params.name && params.age) {
                  return true
                } else {
                  console.log("validation error");
                  return false;
                }
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
            "previous": {
              target: "formA"
            }
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

