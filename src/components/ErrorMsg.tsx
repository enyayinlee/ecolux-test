import {ReactNode} from 'react'
import classnames from 'classnames'

const ErrorMsg = ({ children, msg, show }: { children: ReactNode, msg: string, show: boolean }) => {
    return <>
      {children}
      <div className={classnames({ 'visible text-red-500': !!show, 'invisible': !show })}>{msg}</div>
    </>
  }

  export default ErrorMsg