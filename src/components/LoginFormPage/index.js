import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { loginUser } from '../../store/session'
import styles from './LoginForm.module.css'

const LoginFormPage = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user)

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(loginUser({ credential, password }))
      .then(async () => {
        setCredential('');
        setPassword('');
        history.push('/');
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      <ul>
        {errors.length > 0 && errors.map((error, idx) => <li className={styles.errors} key={idx}>{error}</li>)}
      </ul>
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