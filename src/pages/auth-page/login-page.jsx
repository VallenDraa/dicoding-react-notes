import "./auth-form.css";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuth, useLocale } from "../../hooks";
import { LOCALE_DATA } from "../../utils/locale-data";

export function LoginPage() {
  const { locale } = useLocale();

  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Log user out on visit
  React.useEffect(() => logout(), [logout]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      alert(LOCALE_DATA[locale].loginPage.missingFieldAlert);
      return;
    }

    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      alert(LOCALE_DATA[locale].loginPage.failToLogin);
    }
  }

  return (
    <div className="auth-form__wrapper">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form__logo">
          <span>🗒️</span>
          <h1>notnotion.</h1>
          <p>{LOCALE_DATA[locale].loginPage.subtitle}</p>
        </div>

        <label className="auth-form__label">
          <input
            className="auth-form__input"
            type="email"
            value={email}
            placeholder={LOCALE_DATA[locale].loginPage.emailPlaceholder}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label className="auth-form__label">
          <input
            value={password}
            type="password"
            placeholder={LOCALE_DATA[locale].loginPage.passwordPlaceholder}
            className="auth-form__input"
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <div className="auth-form__button-group">
          <button
            type="submit"
            className="auth-form__button auth-form__button--submit"
          >
            {LOCALE_DATA[locale].loginPage.submitButton}
          </button>

          <Link to="/register" className="auth-form__link">
            {LOCALE_DATA[locale].loginPage.registerLink}
          </Link>
        </div>
      </form>
    </div>
  );
}
