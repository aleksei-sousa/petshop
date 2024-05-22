import { useState, useEffect } from 'react'
import api from '../../../../utils/api'
import { useNavigate } from 'react-router-dom'
import userFlashMessage from '../../../../hooks/useFlashMessage'

//components
import PetForm from '../../../form/PetForm'


import './AddPet.css'
export default function AddPet () {
    
    const [token] = useState(localStorage.getItem('token') || "")
    const {setFlashMessage} = userFlashMessage()
    const navigate = userFlashMessage()

    async function registerPet(pet){
        let msgType = 'success'
        const formData = new FormData

        //pegar cada item do Pet e jogar no formData para fazer upload de Imagens
        //se for imagem  {}, se não for{}
        //loop for, pq pode vir mais de uma imagem
        await Object.keys(pet).forEach((key) => {
            if(key === 'images'){
                for(let i =0; i < pet[key].length; i++){
                    formData.append('images', pet[key][i])
                }
            }else {
                formData.append(key, pet[key])
            }

        })
        //console.log(formData.get('images'))

        const data = await api.post('pets/create', formData, {
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`,
                'content-type': 'multipart/form-data',
            }
        }).then((response)=>{
            return response.data
        }).catch((err)=>{
            msgType = "error"
            return err.response.data
        })
        setFlashMessage(data.message, msgType)
        if(msgType !==  'error'){
            navigate('/pets/mypets')
        }

    }
    return(
        <section>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <PetForm 
              btnText='Cadastrar Pet'
              handleSubmit={registerPet}
            />
            
        </section>
    )
}