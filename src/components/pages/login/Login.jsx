import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { Context } from "../../../context/UserContext"
import Input from "../../form/input"

import '../register/Register.css'

function Login () {

    const[user, setUser] = useState()
    const { login } = useContext(Context)

    function handleChange (e) {
        setUser({...user, [e.target.name]: e.target.value })
    }
    
    function handleSubmit (e) {
        e.preventDefault()
        //vamos criar um hook que premita logar, deslogar,

        login(user)
        
    }

    return(
        <section className="form_control">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="form_content">
                <Input
                  text="E-mail"
                  type='email'
                  name='email'
                  placeholder='Digite seu E-mail'
                  handleOnChange={handleChange}
                />
                <Input
                  text="Senha"
                  type='password'
                  name='password'
                  placeholder='Digite sua Senha'
                  handleOnChange={handleChange}
                />

                <input type="submit" value="Login"/>
            </form>
            <p>
                Ainda não se cadastrou? <Link to="/register">Clique aqui</Link>
            </p>
        </section>
    )
}
  
export default Login