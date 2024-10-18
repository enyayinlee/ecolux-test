import {useState, useEffect} from 'react'
import ErrorMsg from "./ErrorMsg"
import { User } from '../utils/type'

const Field = ({ labelText, id, onChange, showError, errMsg = '', required, isPwd, reset }: { labelText: string, id: keyof User, onChange: (v: string, target: keyof User) => void, showError: boolean, errMsg: string, required: boolean, isPwd?: boolean, reset: boolean }) => {
    const [val, setVal] = useState<string>('')
    const [init, setInit] = useState<boolean>(reset)
  
    useEffect(() => {
      if (!init && reset) {
        setVal('')
      }
      setInit(reset)
    }, [reset])
  
    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setVal(e.target.value)
      onChange(e.target.value, id)
    }
  
    return <ErrorMsg show={showError} msg={!!showError && !!required && val.length === 0 ? 'This field is required' : errMsg}>
      <label htmlFor={id} className="block">{labelText}</label>
      <input name={id} id={id} type={isPwd ? "password" : "text"} onChange={onInput} className="block border-solid border border-black" value={val} />
    </ErrorMsg>
  }

  export default Field