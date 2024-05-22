import { useState, useEffect } from 'react'
import './Message.css'
import bus from '../../../utils/bus'

export default function Message() {
    let [visibility, setVisibility] = useState(false)
    let [message, setMessage] = useState('')
    let [type, setType] = useState('success')

    useEffect(()=>{
        bus.addListener('flash', ({message, type})=>{
            setVisibility(true)
            setMessage(message)
            setType(type)

            setTimeout(()=>{
                setVisibility(false)
            }, 3000)
        })
    }, [])

    return(

        visibility && (
            <div className={`message ${type}`}>{message}</div>
        )

    )

}