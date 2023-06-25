import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import "./index.css";

class LoginForm extends Component {
  state = { username: "", password: "", showError: false, errorMSG: "" };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  submitSuccess = (jwtToken) => {
    const { history } = this.props;
    Cookies.set("jwt_token", jwtToken, { expiry: 30, path: "/" });
    history.replace("/");
  };

  submitFailure = (errorMSG) => {
    this.setState({ showError: true, errorMSG });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    let apiUrl = "https://apis.ccbp.in/login";
    const userDetails = { username, password };
    let options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token);
    } else {
      this.submitFailure(data.error_msg);
    }
  };

  render() {
    const { username, password, showError, errorMSG } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-form-container">
        <form onSubmit={this.onSubmitForm} className="form-container">
          <div className="username-container">
            <label htmlFor="username" className="username-label">
              USERNAME
            </label>
            <input
              id="username"
              onChange={this.onChangeUsername}
              value={username}
              placeholder="Enter Username"
            />
            >
          </div>
          <div className="password-container">
            <label htmlFor="password" className="password-label">
              PASSWORD
            </label>
            <input
              id="password"
              onChange={this.onChangePassword}
              value={password}
              placeholder="Enter Password"
            />
            >
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          {showError && <p className="error-msg">{errorMSG}</p>}
        </form>
      </div>
    );
  }
}

export default LoginForm;
