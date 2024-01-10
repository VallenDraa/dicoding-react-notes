import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuth, useLocale } from "../../hooks";
import { LOCALE_DATA } from "../../utils/locale-data";

export function RegisterPage() {
  const { locale } = useLocale();

  const navigate = useNavigate();
  const { register, logout } = useAuth();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // Log user out on visit
  React.useEffect(() => logout(), [logout]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name || !email || !password) {
      alert(LOCALE_DATA[locale].registerPage.missingFieldAlert);
      return;
    }

    if (password !== confirmPassword) {
      alert(LOCALE_DATA[locale].registerPage.mismatchPasswordAlert);
      return;
    }

    if (name.length > 12) {
      alert(LOCALE_DATA[locale].registerPage.nameTooLong);
      return;
    }

    if (password.length < 6) {
      alert(LOCALE_DATA[locale].registerPage.passwordTooShort);
      return;
    }

    try {
      await register({ name, email, password });
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="auth-form__wrapper">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form__logo">
          <span>🗒️</span>
          <h1>notnotion.</h1>
          <p>{LOCALE_DATA[locale].registerPage.subtitle}</p>
        </div>

        <label className="auth-form__label">
          <input
            className="auth-form__input"
            type="text"
            value={name}
            placeholder={LOCALE_DATA[locale].registerPage.namePlaceholder}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label className="auth-form__label">
          <input
            className="auth-form__input"
            type="email"
            value={email}
            placeholder={LOCALE_DATA[locale].registerPage.emailPlaceholder}
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label className="auth-form__label">
          <input
            value={password}
            type="password"
            placeholder={LOCALE_DATA[locale].registerPage.passwordPlaceholder}
            className="auth-form__input"
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <label className="auth-form__label">
          <input
            value={confirmPassword}
            type="password"
            placeholder={
              LOCALE_DATA[locale].registerPage.confirmPasswordPlaceholder
            }
            className="auth-form__input"
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </label>

        <div className="auth-form__button-group">
          <button
            type="submit"
            className="auth-form__button auth-form__button--submit"
          >
            {LOCALE_DATA[locale].registerPage.submitButton}
          </button>

          <Link to="/login" className="auth-form__link">
            {LOCALE_DATA[locale].registerPage.loginLink}
          </Link>
        </div>
      </form>
    </div>
  );
}
