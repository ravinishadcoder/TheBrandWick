import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ status: false, message: "" });
  const [isLoading,setIsLoading] = useState(false)
  const [isModal,setIsModal]=useState(false)
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("https://backend-brandwick.vercel.app/api/login", {
        email,
        password,
      })
      .then((res) => {
        setIsLoading(false);
        setIsModal(true)
        setEmail('');
        setPassword('');
        setError({ status: false, message: "" });
      })
      .catch((e) => {
        setIsLoading(false);
        setIsModal(false)
        setError({ status: true, message: e.response.data.message });
      });
  };
  if(isModal){
    return (
        <div className="modal">
        <img src="https://cdn.dribbble.com/users/28588/screenshots/3669080/media/6287b11c9ef7e3dd295ef74ce0f7e17a.gif"/>
    </div>
    )
  }
  return (
    <>
      <div className={`wrapper ${error.status ? "wrapper-error" : ""}`}>
        <form>
          <div className="content">
            <div className="heading">
              <h4>Login</h4>
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
              <button className={`button ${isLoading ? 'spinning':''}`} onClick={handleLogin}>
                Login
              </button>
            </div>
            <div className="notes">
              <p>
                Need an account?{" "}
                <span onClick={() => navigate("/")}>Signup</span>
              </p>
            </div>
            {error.status && (
              <div className="error">
                <p>Oops! {error.message}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
