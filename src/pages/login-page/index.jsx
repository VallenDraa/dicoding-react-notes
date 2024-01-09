import React from "react";

export function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label>
        <input
          value={password}
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
      </label>

      <button type="submit">Login</button>
    </form>
  );
}
