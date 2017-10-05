import React, { Component } from 'react';
import { Link } from 'react-router'
import * as StateChart from '../../lib/statechart'
import { browserHistory } from 'react-router';

export default class App extends Component {

  constructor(props) {
    super(props);

    // window.stateMachine = _.extend({

    //     initialState: "formA",
    //     states: {
    //         'formA': {
    //             'next':  function(params) {
    //               console.log("params", params);
    //               browserHistory.push('/formA');
    //             },
    //             'guard': function() { console.log("came to guard"); return true; }
    //         },
    //         'formB': {
    //             'previous':  function() { browserHistory.push('/formA') },
    //             'next':  function() { browserHistory.push('/formC') },
    //             'guard': function() { console.log("came to guard"); return true; },
    //         }
    //     }

    // }, StateChart);


  }


  componentDidMount() {
    // stateMachine.run()
    // stateMachine.dispatch('next', {foo: 'bar'});
  }


  render() {
    return (
      <div>
        <h1>
          <Link to = "/">State Chart Demo</Link>
        </h1>
      </div>
    );
  }
}
