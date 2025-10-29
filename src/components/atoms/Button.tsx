import type { ButtonProps } from '../../config/interfaces';

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  
  const baseStyles = 'font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-primary-400 text-white font-bold hover:bg-primary-300 focus:ring-primary-500',
    secondary: 'bg-secondary-700 text-white hover:bg-secondary-600 focus:ring-secondary-500',
    outline: 'border-2 border-primary-400 text-primary-400 hover:bg-primary-400/10 hover:border-primary-300 focus:ring-primary-500',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
