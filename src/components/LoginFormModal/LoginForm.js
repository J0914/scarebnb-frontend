import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from '../../store/session'
import styles from './LoginForm.module.css'

const LoginForm = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(loginUser({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className={styles.loginFormContainer}>
      <span className={styles.label}>Welcome to Scarebnb</span>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.length > 0 && errors.map((error, idx) => <li className={styles.errors} key={idx}>{error}</li>)}
        </ul>
        <div className={styles.inputContainer}>
          <input
            placeholder="Username or Email"
            id={styles.credential}
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
          <input
            placeholder="password"
            id={styles.password}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button id={styles.submitButton} type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
};

export default LoginForm;