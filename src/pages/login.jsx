import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/image/Logo Icon IChat.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

//Juanda Gilang Purnomo

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { navigate } = this.props;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged In:", userCredential.user);
      navigate("/chat"); 
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("Error: " + error.message);
      this.setState({ email: "", password: "" });
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="min-h-screen bg-gray-600 flex flex-col justify-center items-center relative">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative z-10">
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Cute Cat"
              className="w-32 h-32 object-cover rounded-full shadow-md"
            />
          </div>
          <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">
            Welcome to IChat
          </h2>
          <form onSubmit={this.handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
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
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
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
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-orange-500 hover:underline">
              Register here
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

export default withNavigate(Login);
