import React, { useRef } from 'react';
import "./styles.css"

function Input({id, label, type, value, setValue, name, ref, ...rest}) {

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>

      <input className='input' style={id === "price" ? {paddingLeft: "28px"} : null} 
        type={type} 
        value={value}
        name={name}
        onChange={({ target }) => setValue(target.value)}
        {...rest}
        />
        {id === "price" ? <span className='money-prefixo'>R$</span> : null}
    </div>
  );
}

export default Input;