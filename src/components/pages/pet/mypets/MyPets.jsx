import { Link } from "react-router-dom";
import RoundedImage from '../../../layout/roundedImage/RoundedImage'
import useFlashMessage from '../../../../hooks/useFlashMessage'
import { useState, useEffect } from "react"
import api from '../../../../utils/api'

import style from './MyPets.module.css'
export default function MyPets  () {

    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage(

        useEffect(()=>{
            api.get('/pets/mypets', {
                headers:{
                    Authorization: `Bearer ${JSON.parse(token)}`
                },
            }).then((response)=>{setPets(response.data.pets)})
        },[token])
    )
    console.log(pets[0])
    return(
        
        <section>
            
            <div className={style.top_section}>
                <h1>Meus Pets</h1>
                <Link to="/pet/add" className={style.btn__nav}>Cadastrar Pets</Link>
            </div>
            <div className={style.container_card}>
                {pets.length > 0 &&
                    pets.map((pet)=>(
                        <div className={style.content_card} key={pet._id}>
                          <div className={style.img_nome}>
                              <RoundedImage
                                src={`http://localhost:5000/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                width='75px'/>
                              <span className="bold">{pet.name}</span>
                          </div>
                          <div className="action">
                            {pet.available ? (
                             <>
                               {pet.adopter && <button>Concluir adoção</button>}
                               <Link 
                                 to={`/pet/edit/${pet._id}`}
                                 className={style.btn_action}>
                                    Editar
                                </Link>
                               <button className={style.btn_action}>Excluir</button>
                             </>
                            ): <p>Pet já adotado</p>}
                          </div>
                        </div>
                    ))}
                {pets.length === 0 && <p>Não há Pets cadastrados</p>}
            </div>
        </section>
    )
}