import Input from "./input"
import { useState } from "react"
import './PetForm.css'
import Select from "./Select" 
//btnText será usado para mudar o tipo de formuário
//petData se houver(são os dados do Pet)
//handleSubmit irá definir qual envio será feito, cadastro ou edição
export default function PetForm ({handleSubmit, petData, btnText}) {
    
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ['Branco', 'preto', 'cinza', 'caramelo', 'mesclado']

    function onFileChange (e) {
      setPreview(Array.from(e.target.files))
      setPet({...pet, images: [...e.target.files]})
    }
    function handleChange (e) {
      setPet({...pet, [e.target.name]: e.target.value})
    }
    function handleColor (e) {
      setPet({...pet, color: e.target.options[e.target.selectedIndex].text})
    }
    function submit (e) {
      e.preventDefault()
      console.log(pet)
      handleSubmit(pet)   
    }

    return(
        <form onSubmit={submit} className="form_container">
            <div className="preview_pet_images">
              {preview.length > 0 
                ? preview.map((image, index) => (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={pet.name}
                    key={`${pet.name} + ${index}`}
                  />
              ))
              : pet.images &&
              pet.images.map((image, index)=>(
                <img
                src={`http://localhost:5000/images/pets/${image}`}
                alt={pet.name}
                key={`${pet.name} + ${index}`}
              />
              ))

            }
            </div>
            <Input
              text='imagens do pet'
              type='file'
              name='images'
              handleOnChange={onFileChange}
              multiple={true}
            />
            <Input
              text='nome do Pet'
              type='text'
              name='name'
              placeholder='Digite o nome'
              handleOnChange={handleChange}
              value={pet.name || ''}
            />
            <Input
              text='idade do Pet'
              type='text'
              name='age'
              placeholder='Digite a idade'
              handleOnChange={handleChange}
              value={pet.age || ''}
            />
            <Input
              text='peso do Pet'
              type='text'
              name='weight'
              placeholder='Digite a peso'
              handleOnChange={handleChange}
              value={pet.weight || ''}
            />
            <Select
              name='color'
              text='selecione a cor'
              options={colors}
              handleOnChange={handleColor}
              value={pet.color || ''}/>
              
            <input type="submit" value={btnText} />
        </form>
    )
}