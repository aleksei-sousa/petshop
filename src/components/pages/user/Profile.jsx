import api from "../../../utils/api"
import Input from "../../form/input"
import RoundedImage from "../../layout/roundedImage/RoundedImage"
import '../register/Register.css'
import { useState, useEffect } from "react"
import useFlashMessage from '../../../hooks/useFlashMessage'
function Profile () {

    const {setFlashMessage} = useFlashMessage()
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(()=>{

        api.get('/users/checkuser', {
            headers: {
                authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response)=>{
            setUser(response.data)
        })
    }, [token])

    function onFileChange (e){
        setPreview(e.target.files[0])
        setUser({...user, [e.target.name]: e.target.files[0] })
    }

    function handleChange (e) {
        setUser({...user, [e.target.name]: e.target.value })
    }
    async function handleSubmit (e){
        e.preventDefault()
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(user).forEach((key)=> {
            formData.append(key, user[key])})

        const data = await api.patch(`users/edit/${user._id}`, formData, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`,
                'content-type': 'multipart/form-data',
            }
        }).then((response)=>{
            let msgType = 'success'
            //console.log(response.data.message)
            //console.log(data)
            const msg = response.data.message
            setFlashMessage(msg, msgType)
        }).catch((err)=>{
            msgType = 'error'
            //console.log(err.response.data.message)
            const msg = err.response.data.message
            setFlashMessage(msg, msgType)
        })
    }   
//http://localhost:5000//images/users/user.image
//console.log(process.env.REACT_APP_API)
//process.env.DB_HOST
    return(
        <section className="form_control">
            <h1>Perfil</h1>
            {/* Só será exibido algo se houver uma imagem no bd ou no preview */}
            {(user.image || preview) && (
                            <RoundedImage
                            src={preview ? URL.createObjectURL(preview) : `http://localhost:5000/images/users/${user.image}`}
                            alt={user.name}
                            // width={'px75'}
                          />
            )}

            <form onSubmit={handleSubmit} className="form_content">
                    <Input
                        text="imagem"
                        type="file"
                        name="image"
                        handleOnChange={onFileChange}
                    />
                    <Input
                        text="E-mail"
                        type="emai"
                        name="email"
                        placeholder='Digite seu email'
                        handleOnChange={handleChange}
                        value={user.email || ''}
                    />
                    
                    <Input
                        text="Nome"
                        type='text'
                        name='name'
                        placeholder='Digite seu nome'
                        handleOnChange={handleChange}
                        value={user.name || ''}
                    />
                    <Input
                        text="Telefone"
                        type='text'
                        name='phone'
                        placeholder='Digite seu telefone'
                        handleOnChange={handleChange}
                        value={user.phone || ''}
                    />
                    <Input
                        text="Senha"
                        type='password'
                        name='password'
                        placeholder='Digite sua Senha'
                        handleOnChange={handleChange}
                    />
                    <Input
                        text="Confirmação de Senha"
                        type='password'
                        name='confirmpassword'
                        placeholder='Confirm a sua Senha'
                        handleOnChange={handleChange}
                    />
                    <input type="submit" value="Editar" />
            </form>
        </section>
        
    )
}
 
export default Profile