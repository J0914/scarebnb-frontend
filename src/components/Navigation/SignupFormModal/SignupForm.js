import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../../../store/session";
import styles from './SignupForm.module.css'


const SignupForm = ({setParentIsOpen}) => {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (password === confirmPassword) {
      return dispatch(signupUser({
        first_name,
        last_name,
        username,
        email,
        password
      }))
        .then(setParentIsOpen(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    } else {
      const errs = ['Boo! Your passwords don\'t match.'];
      setErrors(errs)
    }
  };



  return (
    <div className={styles.signupFormContainer}>
      <span className={styles.label}>Welcome To Scarebnb</span>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.length > 0 && errors.map((error, idx) => <li className={styles.errors} key={idx}>{error}</li>)}
        </ul>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder="First Name"
            id={styles.firstName}
            type="text"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
          />
          <input
            placeholder="Last Name"
            id={styles.lastName}
            type="text"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
          />
          <input
            placeholder="Username"
            id={styles.username}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Email"
            id={styles.email}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            id={styles.password}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="Confirm Password"
            id={styles.confirmPassword}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button id={styles.submitButton} type="submit">Continue</button>
        </div>
      </form>
    </div>
  )
};

export default SignupForm;