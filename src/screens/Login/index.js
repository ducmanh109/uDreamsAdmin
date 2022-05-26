import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => console.log("error login >>>", error))
      .then(() => navigateTo("home"));
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input
            type="email"
            name="uname"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Mật khẩu </label>
          <input
            type="password"
            name="pass"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="button-container">
          <input
            type="submit"
            title="ok"
            onClick={() => <Link to={"home"} />}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
