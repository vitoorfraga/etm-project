import React, { useRef } from 'react';
function InputSelect({id, label, value, setValue, name, ref, options, ...rest}) {

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}:</label>

      <select className='input' 
        name={name}
        ref={ref}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        >
          <option value="" disabled>
            Selecione {name  === "size" ? "o tamanho" : "a categoria"}
          </option>

          {options.map((option) => {
            return(
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            )
          })}
        </select>
    </div>
  );
}

export default InputSelect;