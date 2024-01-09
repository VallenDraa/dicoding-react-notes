import "./auth-form.css";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Log user out on visit
  React.useEffect(() => logout(), [logout]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      alert("please fill in all fields");
      return;
    }

    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      alert("Fail to login!");
    }
  }

  return (
    <div className="auth-form__wrapper">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form__logo">
          <span>🗒️</span>
          <h1>notnotion.</h1>
          <p>write stuff here, but login first... </p>
        </div>

        <label className="auth-form__label">
          <input
            className="auth-form__input"
            type="email"
            value={email}
            placeholder="email"
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label className="auth-form__label">
          <input
            value={password}
            type="password"
            placeholder="password"
            className="auth-form__input"
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <div className="auth-form__button-group">
          <button
            type="submit"
            className="auth-form__button auth-form__button--submit"
          >
            login
          </button>

          <Link to="/register" className="auth-form__link">
            new to notnotion?
          </Link>
        </div>
      </form>
    </div>
  );
}
