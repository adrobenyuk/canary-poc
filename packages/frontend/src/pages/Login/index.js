import { useCallback } from "react";
import { loadCanary } from "../../methods";

import "./styles.css";

const Login = () => {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email: e.target.elements.email.value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((user) => {
        if (user && user.assets) {
          return loadCanary(user.assets.script, user.assets.style);
        }
        return ""; // TODO: push to main
      })
      .catch(console.error);
  }, []);

  return (
    <div className="login-page">
      <h1 className="mb-5 text-white">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label text-white">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label text-white"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label
            className="form-check-label text-white"
            htmlFor="exampleCheck1"
          >
            Check me out
          </label>
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-warning">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
