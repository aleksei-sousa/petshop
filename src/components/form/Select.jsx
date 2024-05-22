import '../pages/register/Register.css'
export default function Select ({text, name, options, handleOnChange, value}) {
    return(
        <div className="form_control">
          <label className='label' htmlFor={name}>{text}</label>
          <select
            className='input_login'
            name={name}
            id={name}
            onChange={handleOnChange}
            value={value || ''}>
            <option> Selecione uma opção</option>
            {options.map((option)=>(
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
        </div>
        
    )
}