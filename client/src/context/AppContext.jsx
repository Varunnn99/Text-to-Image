import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props)=>{
    const [user,setUser] = useState(null);
    const [showLogin,setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credit, setCredit] = useState(0)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const loadCreditsData = async ()=>{
        try {
            console.log('Loading credits with token:', token)
            console.log('Backend URL:', backendUrl)
            const {data} = await axios.get(backendUrl+'/api/user/credits', {headers: {token:token}})
            console.log('Credits response:', data)
            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log('Error loading credits:', error)
            toast.error(error.message)
        }
    }

    const generateImage = async (prompt)=>{
        try {
            const {data} = await axios.post(backendUrl+'/api/image/generate-image', {prompt}, {headers: {token:token}})
            console.log('Image generated:', data)
            if (data.success){
                loadCreditsData()
                return data.resultImage
            }else{
                toast.error(data.message)
                loadCreditsData()
                if (data.CreditBalance === 0){
                    navigate('/buy')
                }
            }
        } catch (error) {
            console.log('Error generating image:', error)
            toast.error(error.message)
        }
    }

    const logout = ()=>{
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
        setCredit(0)
    }

    useEffect (()=>{
        if (token){
            loadCreditsData()
        }
    },[token])

    useEffect(() => {
        if (user && user.credits !== undefined) {
            setCredit(user.credits)
        }
    }, [user])

    const value = {
        user,setUser,showLogin,setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider