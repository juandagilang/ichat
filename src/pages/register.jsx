import React, { Component } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

//Juanda Gilang Purnomo

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      success: "", 
    };
  }
  

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegister = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { navigate } = this.props;
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Registered:", userCredential.user);
      this.setState({ success: "Registration Successful! Please login.", error: "" });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error("Registration Error:", err.message);
      if (err.code === "auth/email-already-in-use") {
        this.setState({ error: "This email is already registered. Please login instead.", success: "" });
      } else {
        this.setState({ error: err.message, success: "" });
      }
    }
  };
  

  render() {
    const { email, password, error, success } = this.state;
  
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center relative">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative z-10">
          <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">Register</h2>
          {success && (
            <div className="bg-green-100 text-green-700 border border-green-300 p-4 rounded mb-4">
              {success}
            </div>
          )}
  
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded mb-4">
              {error}
            </div>
          )}
  
          <form onSubmit={this.handleRegister}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition duration-200"
            >
              Register
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Have an Account?{" "}
            <a href="/login" className="text-orange-500 hover:text-red-600">
              Login Here
            </a>
          </p>
        </div>
      </div>
    );
  }
}  

function withNavigate(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default withNavigate(Register);
