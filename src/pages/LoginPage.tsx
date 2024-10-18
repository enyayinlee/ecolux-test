import { useState, useContext, useRef } from "react";
import { DataContext } from "../components/DataProvider";
import _ from 'lodash'
import ErrorMsg from "../components/ErrorMsg";
import Field from "../components/Field";
import { STATUS, User } from "../utils/type";
import { validateEmail, validatePwd } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const ERR = {
  invalidPwd: "Invalid character. Only A-Z, a-z, 0-9 are allowed.",
  invalidEmail: "Invalid email format.",
  invalidLogIn: 'Email or password incorrect.',
  invalidCreate: 'Email already registered.',
  pwdRequired: 'This field is required.',
  emailRequired: 'This field is required.'
};

export const LoginPage = () => {
  const dataContext = useContext(DataContext);
  const userTmp = useRef<User>({ email: '', pwd: '' })
  const [user, setUser] = useState<User>({ email: '', pwd: '' })
  const [err, setErr] = useState<{
    [k in keyof typeof ERR]?: boolean
  }>({});
  const [reset, setReset] = useState<boolean>(false)
  const navigate = useNavigate()

  const onChange = _.debounce((v: string, target: keyof User) => {
    userTmp.current[target] = v
    setUser({ ...userTmp.current })
    setReset(false)
  }, 300)

  const onSubmit = () => {
    // let valid = !Object.values(err).includes(true);
    let valid = true
    const errTmp: typeof err = {}

    if (user.email.length === 0) {
      errTmp.emailRequired = true
      valid = false
    } else if (!validateEmail(user.email)) {
      errTmp.invalidEmail = true;
      valid = false;
    }
    if (user.pwd.length === 0) {
      errTmp.pwdRequired = true;
      valid = false

    } else if (!validatePwd(user.pwd)) {
      errTmp.invalidPwd = true;
      valid = false;
    }

    if (valid) {
      const status = dataContext.create(user);
      if (status === STATUS.SUCCESS) {
        setErr({})
        setUser({ email: '', pwd: '' })
        setReset(true)
        return;
      } else errTmp.invalidCreate = true
    }

    setErr({ ...errTmp })
  };

  const onLogin = () => {
    const status = dataContext.logIn(user)
    if (status === STATUS.INVALID) {
      setErr({ invalidLogIn: true })
    } else {
      setErr({})
      navigate('/dashboard')
    }
  }

  return (
    <div className="App p-8 w-96 bg-zinc-200 rounded-lg mx-auto mt-32">
      <ErrorMsg show={!!err.invalidCreate || !!err.invalidLogIn} msg={err.invalidCreate ? ERR.invalidCreate : err.invalidLogIn ? ERR.invalidLogIn : 'one line'}>
        <Field id='email' labelText='Email' onChange={onChange} showError={!!err.invalidEmail || !!err.emailRequired} errMsg={ERR.invalidEmail} required={true} reset={reset} />
        <Field id='pwd' labelText='Password' onChange={onChange} showError={!!err.invalidPwd || !!err.pwdRequired} errMsg={ERR.invalidPwd} required={true} isPwd={true} reset={reset} />
        <button onClick={onLogin} className="mr-4 px-4 py-2 rounded-full bg-slate-400">Login</button>
        <button onClick={onSubmit} className="px-4 py-2 rounded-full bg-teal-400">Create Account</button>
      </ErrorMsg>
    </div>
  );
}

export default LoginPage