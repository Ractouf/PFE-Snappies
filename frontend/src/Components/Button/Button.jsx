import { createSignal } from 'solid-js';

const Button = ({ onClick, label }) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
