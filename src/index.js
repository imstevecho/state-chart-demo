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
import ControlFlow from './control_flow.json';


const createStoreWithMiddleware = applyMiddleware()(createStore);


function addGlobals(interpreter, scope) {

  interpreter['FLOW_DESC'] = ControlFlow;

  var wrapper = function(form_id, input_id) {
    var form = document.getElementById(form_id);
    if (form) {
      return interpreter.createPrimitive(form.elements[input_id].value);
    } else {
      return null;
    }
  };
  interpreter.setProperty(scope, 'getFormData', interpreter.createNativeFunction(wrapper));


  var wrapper = function(target, value) {
    return interpreter.setProperty(scope, target, value);
  };
  interpreter.setProperty(scope, 'setGlobal', interpreter.createNativeFunction(wrapper));


  var wrapper = function(obj, name) {
    // return this.properties[obj].properties[name].data
    // var parent_property = interpreter.getProperty(this, obj);

    var parent_property = interpreter.getValueFromScope(obj);

    if (arguments.length === 1) {
      return parent_property;
    } else {
      var child_property = interpreter.getProperty(parent_property, name);
      return child_property.data;
    }
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


  // var wrapper = function() {


  //   var v = this.properties['vparams'].properties['name'].data;

  //   var age = interpreter.getGlobal('vparams', 'age');
  //   console.log(age);

  //   return true;
  // };
  // interpreter.setProperty(scope, 'canProceed', interpreter.createNativeFunction(wrapper));


}





window.stateMachine = _.extend({

    initialState: "formA",

    states: {
        "formA": {
            "entry": function() {

                var initial_form = JSON.stringify({agreed: true});

                var flow_info = ControlFlow.formA.canLand;

                console.log("flow_info: ", flow_info);
                var input_string = "setGlobal('initial_form', " + initial_form + "); var initialForm = initial_form; log('initialFrom data: ' + initialForm.agreed); setGlobal('result', " + flow_info + ")";

                // "var age = getFormData('personal_info', 'age'); if (age > 18) { log('greater than 18'); } else { log('less than 18');}; var test = function(msg) { log('Got ' + msg)}; setGlobal('vparams', " + string_params + ");  var hash = vparams; log('--here start---'); log(hash.age); log('--here end---'); test(vparams.name); log('getGlobal result: ' + getGlobal('vparams', 'name')); log(vparams.age); log(vparams.name); //log('canProcess result: ' + canProceed());";


                var myInterpreter = new Interpreter(input_string, addGlobals);
                myInterpreter.run();
                console.log('result: ' + myInterpreter.getValue('result'));

                debugger;

              // console.log("Came to formA");
              browserHistory.push('/formA');
            },
            "exit": function() {
              // console.log("came to can exit");
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
                // console.log("data validation goes here");


                var json = {
                  canShow: "getFormValue('personal_info', 'age') > 18"
                }


                var string_params = JSON.stringify(params);
                console.log("json string: ", string_params);
                var input_string = "var age = getFormData('personal_info', 'age'); if (age > 18) { log('greater than 18'); } else { log('less than 18');}; var test = function(msg) { log('Got ' + msg)}; setGlobal('vparams', " + string_params + ");  var hash = vparams; log('--here start---'); log(hash.age); log('--here end---'); test(vparams.name); log('getGlobal result: ' + getGlobal('vparams', 'name')); log(vparams.age); log(vparams.name); //log('canProcess result: ' + canProceed());";


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
              // console.log("Came to formB");
              // console.log(params);
              browserHistory.push('/formB');
            },
            "next":  { target: "formC"  },
            "previous": {
              target: "formA"
            }
        },
        "formC": {
            "entry": function(params) {
              // console.log("Came to formC");
              // console.log(params);
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

