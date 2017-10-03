import React, { Component } from 'react';

export default class FormC extends Component {
  render() {
    return (
      <div>
        <h1>Input Form C</h1>
        <h5>Please enter your work information.</h5>
        <form>
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
            <a className="btn btn-primary continue">Save</a>
          </div>
        </form>
      </div>

    );
  }
}
