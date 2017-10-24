import Interpreter from 'js-interpreter';
import ControlFlow from './control_flow.json';


function addGlobals(interpreter, scope) {


  var wrapper = function(target, value) {
    return interpreter.setProperty(scope, target, value);
  };
  interpreter.setProperty(scope, 'setGlobal', interpreter.createNativeFunction(wrapper));

  var wrapper = function(obj, name) {
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

}


var data = {
  age: 35,
  gender: 'Male',
  province: 'ON'
};



export default function runBenchmark() {
  const stringCode = "initialForm.age > 18 && initialForm.gender === 'Male' && initialForm.province === 'ON'";
  const formData = JSON.stringify(data);
  const code = "setGlobal('initial_form', " + formData + "); var initialForm = initial_form; log('initialFrom data: ' + initialForm.age); setGlobal('result', " + stringCode + ")";


  // console.log(code);

  const myInterpreter = new Interpreter(code, addGlobals);

  myInterpreter.run();
  const result = myInterpreter.getValue('result');
  return result;
}

