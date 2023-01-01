import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'

type GreetingContainerPropsType = {
    users: UserType[]
    addUserCallback: (name: string) => void
}

export const pureAddUser = (
    name: string,
    setError: (error: string) => void,
    setName: (name: string) => void,
    addUserCallback: (name: string) => void
) => {
    if (name === '') {
        setError('Ошибка, введите имя!')
    } else {
        addUserCallback(name)
        setName('')
    }
}

export const pureOnBlur = (name: string, setError: (error: string) => void) => {
    setError('Enter value')
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: () => void) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
        addUser()
    }
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string>('')

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value) {
            setName(e.currentTarget.value)
            error && setError('')
        } else {
            name && setName('')
            setError('Ошибка, введите имя!')
        }
    }
    
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.currentTarget.value !== '') {
            pureOnEnter(e, addUser)
        } else {
            setError('Ошибка, введите имя!')
        }

    }

    const totalUsers = users.length
    const lastUserName = users.at(-1)?.name

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer