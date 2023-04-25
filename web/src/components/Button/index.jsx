import React from 'react';
import './styles.css';

function Button({text, onClick, disabled = false}) {
  return (
  <button disabled={disabled} className='button' onClick={onClick}>{text}</button>
  );
}

export default Button;