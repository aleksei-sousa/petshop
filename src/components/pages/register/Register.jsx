import { useState, useContext } from "react"
import Input from "../../form/input"
import './Register.css'
import { Link } from 'react-router-dom' 
import {Context} from '../../../context/UserContext'


function Register () {

const [user, setUser] = useState({})

const { register } = useContext(Context)

function handleChange (e) {
    setUser({...user, [e.target.name]: e.target.value })
}

function  handleSubmit (e) {
    e.preventDefault()
    //vamos criar um hook que premita logar, deslogar,  
    register(user)
}

    return(
        <section className="form_control">
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit} className="form_content">
                <Input
                  text="Nome"
                  type='text'
                  name='name'
                  placeholder='Digite seu nome'
                  handleOnChange={handleChange}
                />
                <Input
                  text="Telefone"
                  type='text'
                  name='phone'
                  placeholder='Digite seu Telefone'
                  handleOnChange={handleChange}
                />
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
                <Input
                  text="Confirme a senha"
                  type='password'
                  name='confirmpassword'
                  placeholder='Confirme sua Senha'
                  handleOnChange={handleChange}
                />
                <input type="submit" value="Cadastrar"/>
            </form>
            <p>
                Já tem conta? <Link to="/login">Clique aqui</Link>
            </p>
        </section>
    )
}
 
export default Register