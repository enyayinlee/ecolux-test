import React, { useContext } from "react";
import { DataContext } from "./DataProvider";
import { Log, STATUS } from "../utils/type";

const classN = 'text-left border-b border-black pd-2 pl-4'

const ACTION = {
    login: 'Log in',
    create: 'Create'
}

const RESULT = {
    [STATUS.EXIST]: 'Account already exist',
    [STATUS.INVALID]: 'Email or password invalid',
    [STATUS.LOGGEDIN]: 'Login success',
    [STATUS.SUCCESS]: 'Account created'
}

const Cell = ({ datum }: { datum: Log }) => {
    return <>
        <td className={classN}>{datum.email}</td>
        <td className={classN}>{datum.pwd}</td>
        <td className={classN}>{ACTION[datum.action]}</td>
        <td className={classN}>{RESULT[datum.result]}</td>
    </>
}

const LogTable = () => {
    const dataContext = useContext(DataContext)

    return <>
        <h1 className="text-xl ml-96 font-bold">Action log table</h1>
        <table className="table-fixed container mx-auto mt-8 w-3/6">
            <thead>
                <tr>
                    <th className={classN}>Email</th>
                    <th className={classN}>Password</th>
                    <th className={classN}>Action</th>
                    <th className={classN}>Status</th>
                </tr>
            </thead>
            {dataContext.log.map((datum, idx) => <tr key={`user-${idx}`}><Cell datum={datum} /></tr>)}
        </table>
    </>;
};

export default LogTable;
