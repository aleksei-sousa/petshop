function Input (
{    type,
    text,
    name,
    placeholder,
    handleOnChange,
    value,multiple}) {
    return(
        <div className="inputs">
            <label className="label" htmlFor={name}>{text}:</label>
            <input
               className="input_login"
               type={type}
               name={name}
               id={name}
               placeholder={placeholder}
               onChange={handleOnChange}
               value={value}
               {...(multiple ? {multiple} : '')}
            />
        </div>
    )
}
 
export default Input