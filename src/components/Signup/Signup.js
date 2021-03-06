import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./Signup.scss";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup = (event) => {
    event.preventDefault();
    if (
      (this.state.username =
        "" || this.state.email === "" || this.state.password === "")
    ) {
      alert("Add the required details");
    } else {
      fetch(
        "http://ec2-15-206-93-116.ap-south-1.compute.amazonaws.com:5000/signup",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.state.username,
            email: this.state.email,
            password: this.state.password,
          }),
        }
      )
        .then((res) => res.json())
        .then(console.log("working"))
        .then((user) => {
          if (user) {
            this.props.routeProps.history.push("/");
            this.props.loadUser(user);
            console.log(user);
          }
        });
    }
  };

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { username, email, password } = this.state;
    return (
      <div class="main">
        <form class="form">
          <p class="head">Create new customer account</p>
          <span className="span"></span>

          {/* input */}
          <div className="input-grp">
            <div className="label">
              <label className="label" htmlFor="username">
                Full Name
              </label>
            </div>
            {/* user-icon */}
            <i className="fas fa-user fa-s icon"></i>
            <input
              name="username"
              type="text"
              value={username}
              onChange={this.handleChange}
              placeholder="Name"
              className="input"
              required
            />
            {/* label */}
          </div>

          <div className="input-grp">
            <div className="label">
              <label className="label" htmlFor="email">
                Email
              </label>
            </div>
            {/* Email icon */}
            <i class="fas fa-envelope fa-s icon"></i>
            <input
              name="email"
              type="email"
              value={email}
              onChange={this.handleChange}
              placeholder="Email"
              className="input"
              required
            />
          </div>

          <div className="input-grp">
            <div className="label">
              <label className="label" htmlFor="password">
                Password
              </label>
            </div>
            {/* password icon */}
            <i class="fas fa-key fa-s icon"></i>
            <input
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
              placeholder="Password"
              className="input"
              required
            />
          </div>

          <div className="buttons">
            <Link to="/signin">
              <button className="btn">Back</button>
            </Link>

            <button onClick={this.handleSignup} className="btn">
              Sign Up
            </button>
          </div>
          {/* <p className='terms'>
              By signing up, you agree to our Terms of Use and Privacy Policy.
            </p> */}
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);
