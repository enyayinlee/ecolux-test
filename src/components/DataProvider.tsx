import React, { createContext, useRef, useState } from "react";
import { Log, STATUS, User } from "../utils/type";

interface DataContextInterface { log: Array<Log>, create: (datum: User) => STATUS, logIn: (datum: User) => STATUS, loggedIn: boolean }

export const DataContext = createContext<DataContextInterface>({
    create: () => STATUS.SUCCESS,
    logIn: () => STATUS.SUCCESS,
    log: [],
    loggedIn: false,
});

const DataProvider = (props: { children: React.ReactNode }) => {
    const [log, setLog] = useState<Array<Log>>([]);
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const userList = useRef<Array<User>>([])

    const getUser = (email: string): User | undefined => userList.current.find((user) => user.email === email)

    const logIn = (datum: User) => {
        const user = getUser(datum.email)
        if (!user || user.pwd !== datum.pwd) {
            setLog([...log, { ...datum, result: STATUS.INVALID, action: 'login' }]);
            return STATUS.INVALID
        }

        setLoggedIn(true)
        setLog([...log, { ...datum, result: STATUS.LOGGEDIN, action: 'login' }])
        return STATUS.SUCCESS
    };

    const create = (datum: User) => {
        const user = getUser(datum.email)
        if (!user) {
            userList.current.push(datum)
            setLog([...log, { ...datum, result: STATUS.SUCCESS, action: 'create' }])
            return STATUS.SUCCESS
        } else {
            setLog([...log, { ...datum, result: STATUS.EXIST, action: 'create' }])
            return STATUS.EXIST
        }
    }

    return (
        <DataContext.Provider value={{ log, logIn, create, loggedIn }}>
            {props.children}
        </DataContext.Provider>
    );
};

export default DataProvider;
