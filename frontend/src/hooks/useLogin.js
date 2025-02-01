import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useLogin = () => {
    const [error, setError] =useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        }) //add in the process.env for this

        const json = await response.json() //data

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            // save the user to local storage so that the user doesnt need to keep relogin
            localStorage.setItem('user', JSON.stringify(json))

            //update the uath context
            dispatch({type: "LOGIN", payload: json})

            setIsLoading(false)

        }
    }

    return {login, isLoading, error}
}