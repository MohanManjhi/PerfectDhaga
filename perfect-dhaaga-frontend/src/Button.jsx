/* eslint-disable react/prop-types */
// src/components/Button.js
const Button = ({ children, onClick, variant = 'primary' }) => {
    const baseClasses = 'px-4 py-2 rounded text-white font-semibold';
    const variantClasses = {
      primary: 'bg-blue-500 hover:bg-blue-600',
      secondary: 'bg-gray-500 hover:bg-gray-600',
      danger: 'bg-red-500 hover:bg-red-600',
    };
  
    return (
      <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]}`}>
        {children}
      </button>
    );
  };
  
  export default Button;
  