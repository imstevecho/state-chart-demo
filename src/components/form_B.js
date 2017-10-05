import React, { Component } from 'react';
import { browserHistory } from 'react-router';


export default class FormB extends Component {

  constructor(props) {
    super(props);
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
    this.goPreviousPage = this.goPreviousPage.bind(this);
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

    // browserHistory.push('/formC');
    window.stateMachine.dispatch('next', {foo: 'barb'});


  }


  goPreviousPage(e) {
    window.stateMachine.dispatch('previous');
  }


  render() {
    return (
      <div>
        <h1>Input Form B</h1>
        <h5>Please enter your school information.</h5>
        <form onSubmit={this.handleSubmitClicked}>
          <div className="form-group">
          <hr/>
            <label htmlFor="school_name">School Name:</label>
            <input type="text" className="form-control" name="school_name" ref={(input) => this.input = input}/>
          </div>
          <div className="form-group">
            <label htmlFor="age">Grade:</label>
            <input type="text" className="form-control" name="grade" ref={(input) => this.input = input}/>
          </div>
          <div className="tab-pane" role="tabpanel">
            <a className="btn btn-primary back" onClick={this.goPreviousPage}>Go Back</a>
            <span>&nbsp;&nbsp;</span>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>

        </form>
      </div>
    );
  }
}
