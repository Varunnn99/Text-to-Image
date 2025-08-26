import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {
  const {user,setShowLogin} = useContext(AppContext)
    const navigate=useNavigate()
    const onCLickHandler=()=>{
        if (user){
            navigate('/result')
        }else{
            setShowLogin(true)
        }
  }
  return (
    <div className='pb-16 text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 md:py-16'>See the magic. Try now</h1>

        <button onClick={onCLickHandler} className='sm:text-lg hover:scale-105 transition-all duration-500 text-white bg-black w-auto mt-8 px-12 py-3 inline-flex items-center gap-2 rounded-full'>
        Generate Images
        <img className='h-6' src={assets.star_group} />
        </button>
    </div>
  )
}

export default GenerateBtn