import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from '../../store/session'

const LoginFormPage = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      credential,
      password
    }

    const login = await dispatch(loginUser(credentials));
    console.log('in login form', login)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="credential">Username or Email:</label>
          <input 
          id="credential" 
          type="text" 
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
          id="password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LoginFormPage;