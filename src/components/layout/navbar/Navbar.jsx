import { Link } from "react-router-dom"
import Logo from '../../../assets/logo_pet1.png'
import './Navbar.css'
import { Context } from '../../../context/UserContext'
import { useContext } from "react"
function Navbar () {

    //verificar se estamos autenticados
    const {authenticated, logout} = useContext(Context)
    console.log(authenticated)
    return(
        
        <nav className="navbar">
            <div className="logo">
                <img src={Logo} className="img_logo" alt="" />
                <div className="logo_text">Get a Pet</div>
            </div>
            <ul>
                <li>
                    <Link className="btn__nav" to={'/'}>Adotar</Link>
                </li>

                { authenticated ? (
                    <>
                        <li><Link className="btn__nav" to={'/pet/mypets'}>Meus Pets</Link></li>
                        <li><Link className="btn__nav" to={'user/profile'}>Perfil</Link></li>
                        <li className="btn__nav" onClick={logout}>Sair</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link className="btn__nav" to={'register'}>Registrar</Link>
                        </li>
                        <li >
                            <Link className="btn__nav" to={'login'}>Login</Link>
                        </li>
                    </>
                )

                }
            </ul>
        </nav>
    )
}
 
export default Navbar