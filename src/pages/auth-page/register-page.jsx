import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, logout } = useAuth();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Log user out on visit
  React.useEffect(() => logout(), [logout]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name || !email || !password) {
      alert("please fill in all fields");
      return;
    }

    if (name.length > 12) {
      alert("name must be less than 12 characters.");
      return;
    }

    try {
      await register({ name, email, password });
      navigate("/login");
    } catch (error) {
      alert("Fail to register!");
    }
  }

  return (
    <div className="auth-form__wrapper">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form__logo">
          <span>🗒️</span>
          <h1>notnotion.</h1>
          <p>register and start writing...</p>
        </div>

        <label className="auth-form__label">
          <input
            className="auth-form__input"
            type="text"
            value={name}
            placeholder="name"
            onChange={e => setName(e.target.value)}
          />
        </label>
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
            register
          </button>

          <Link to="/login" className="auth-form__link">
            want to login instead?
          </Link>
        </div>
      </form>
    </div>
  );
}
