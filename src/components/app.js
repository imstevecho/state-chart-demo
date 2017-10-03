import React, { Component } from 'react';
import { Link } from 'react-router'
import * as StateChart from '../../lib/statechart'
import { browserHistory } from 'react-router';

export default class App extends Component {

  constructor(props) {
    super(props);

    window.stateMachine = _.extend({

        initialState: "formA",
        states: {
            'formA': {
                'next':  function() { browserHistory.push('/formA'); },
                'gotoformC':  { target: 'formC'   },
            },
            'formB': {
                'previous':  function() { console.log('form B came here 1') },
                'next':  function() { console.log('form B came here 2') }
            }
        }

    }, StateChart);


  }


  componentDidMount() {
    stateMachine.run();
    stateMachine.dispatch('next');
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
