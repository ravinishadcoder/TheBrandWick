import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("https://backend-brandwick.vercel.app/api/signup", {
        email,
        password,
      })
      .then((res) => {
        setIsLoading(false);
        navigate("/login");
        setEmail('');
        setPassword('');
        setError(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        setError(true);
      });
  };
  return (
    <div className={`wrapper ${error ? "wrapper-error" : ""}`}>
      <form>
        <div className="content">
          <div className="heading">
            <h4>Signup</h4>
          </div>
          <div className="input-wrapper">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-wrapper">
            <button className={`button ${isLoading ? 'spinning':''}`} onClick={handleSignup}>
              Signup
            </button>
          </div>
          <div className="notes">
            <p>
              Already a user?{" "}
              <span onClick={() => navigate("/login")}>Login</span>
            </p>
          </div>
          {error && (
            <div className="error">
              <p>Oops! This email is already exists</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;
