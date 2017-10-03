import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class FormC extends Component {

  constructor(props) {
    super(props);
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
  }

  handleSubmitClicked(e) {
    e.preventDefault();

    console.log("came to form");


    let params= {};
    const form = e.target;
    for ( let i = 0; i < form.elements.length; i++ ) {
      let e = form.elements[i];
      if (e.name) {
        params[e.name] = e.value;
      }
    }

    browserHistory.push('/formD');


  }



  render() {
    return (
      <div>
        <h1>Input Form C</h1>
        <h5>Please enter your work information.</h5>
        <form onSubmit={this.handleSubmitClicked}>
          <div className="form-group">
          <hr/>
            <label htmlFor="company_name">Company Name:</label>
            <input type="text" className="form-control" id="company_name"/>
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" className="form-control" id="title"/>
          </div>
          <div className="tab-pane" role="tabpanel">
            <a className="btn btn-primary back">Go Back</a>
            <span>&nbsp;&nbsp;</span>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>

    );
  }
}
