import React, { Component } from "react";

export default class Default extends Component {
  render() {
    console.log(this.props);
    return (
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ height: "80vh" }}
      >
        <div className="row">
          <div className="text-center text-title text-uppercase pt-5">
            <h1 className="display-3">404</h1>
            <h4 className="d-inline">error </h4>
            <h4 className="d-inline">page not found</h4>
            <p>
              the requested URL
              <span className="text-danger">
                {this.props.location.pathname}
              </span>{" "}
              was not found
            </p>
          </div>
        </div>
      </div>
    );
  }
}
