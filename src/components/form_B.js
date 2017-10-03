import React, { Component } from 'react';

export default class FormB extends Component {
  render() {
    return (
      <div>
        <h1>Input Form B</h1>
        <h5>Please enter your school information.</h5>
        <form>
          <div className="form-group">
          <hr/>
            <label htmlFor="school_name">School Name:</label>
            <input type="text" className="form-control" id="school_name"/>
          </div>
          <div className="form-group">
            <label htmlFor="age">Grade:</label>
            <input type="text" className="form-control" id="grade"/>
          </div>
          <div className="tab-pane" role="tabpanel">
            <a className="btn btn-primary back">Go Back</a>
            <span>&nbsp;&nbsp;</span>
            <a className="btn btn-primary continue">Submit</a>
          </div>

        </form>
      </div>
    );
  }
}
