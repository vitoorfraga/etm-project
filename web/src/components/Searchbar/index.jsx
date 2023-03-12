import React from 'react';

// import { Container } from './styles';

function Searchbar({onChange, value, setValue, ...rest}) {
  return (
  <div>
    <div className="form-field">

      <input className='input'
        type="text" 
        value={value}
        onChange={({ target }) => setValue(target.value)}
        placeholder="Procure pelo nome do produto."
        {...rest}
        />
    </div>
  </div>);
}

export default Searchbar;