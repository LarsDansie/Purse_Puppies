import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      user_email: "",
      user_password: ""
    };
  }
  
  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  register = (e) => {
    e.preventDefault();

    const { user_name, user_email, user_password } = this.state;
    if (!user_name, !user_email || !user_password) {
      return this.setState({ error: "Fill all fields!" });
    }
    this.props.context.register(user_name, user_email, user_password)
      .then((registered) => {
        if (!registered) {
          this.setState({ error: "not registered" });
        }
      })
  };

  render() {
    return !this.props.context.user ? (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Sign Up</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.register}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
            <div className="field">
                <label className="label">Name: </label>
                <input
                  className="input"
                  type="name"
                  name="user_name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Email: </label>
                <input
                  className="input"
                  type="email"
                  name="user_email"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Password: </label>
                <input
                  className="input"
                  type="password"
                  name="user_password"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && (
                <div className="has-text-danger">{this.state.error}</div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    ) : (
      <Redirect to="/products" />
    );
  }
}

export default withContext(Register);
