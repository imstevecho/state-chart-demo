import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import _  from 'lodash';


export default class FormA extends Component {


  constructor(props) {
    super(props);
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
  }

  handleSubmitClicked(e) {
    e.preventDefault();

    let params= {};
    const form = e.target;
    for ( let i = 0; i < form.elements.length; i++ ) {
      let e = form.elements[i];
      if (e.name) {
        params[e.name] = e.value;
      }
    }

    console.log(params);

    // browserHistory.push('/formB');
    window.stateMachine.dispatch('formB', {foo: 'bar1'})
    window.stateMachine.dispatch('next')

  }


  render() {
    return (
      <div>
        <h1>Input Form A</h1>
        <form onSubmit={this.handleSubmitClicked}>
          <div className="form-group">
          <hr/>
            <label htmlFor="name">Name:</label>
            <input type="text" className="form-control" name="name" ref={(input) => this.input = input}/>
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="text" className="form-control" name="age" ref={(input) => this.input = input}/>
          </div>
          <div className="form-group">
            <div className="radio">
              <label><input type="radio" name="work_or_student"/> I am a student</label>
            </div>
            <div className="radio">
              <label><input type="radio" name="work_or_student"/> I work</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}
